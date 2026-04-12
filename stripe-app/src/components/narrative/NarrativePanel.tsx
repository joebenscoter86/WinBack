import { useState, useEffect, useRef, useCallback } from 'react';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { Dispute, PlaybookData, EvidenceFile } from '../../lib/types';
import type { NarrativePhase, NarrativeAnnotation, StatusResponse } from '../../lib/narrative-types';
import { POLL_INTERVAL_MS, MAX_POLL_DURATION_MS } from '../../lib/narrative-types';
import { fetchBackend, ApiError } from '../../lib/apiClient';
import NarrativePreGeneration from './NarrativePreGeneration';
import NarrativeGenerating from './NarrativeGenerating';
import NarrativeReview from './NarrativeReview';
import NarrativeError from './NarrativeError';

interface NarrativePanelProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  evidenceFiles: EvidenceFile[];
  context: ExtensionContextValue;
  editedNarrative: string;
  onEditedNarrativeChange: (text: string) => void;
  onApprove: (narrativeText: string) => void;
  onNavigateBack: () => void;
  submitted?: boolean;
}

const NarrativePanel = ({
  dispute,
  playbook,
  evidenceFiles,
  context,
  editedNarrative,
  onEditedNarrativeChange,
  onApprove,
  onNavigateBack,
  submitted,
}: NarrativePanelProps) => {
  const [phase, setPhase] = useState<NarrativePhase>('idle');
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [narrative, setNarrative] = useState<string>('');
  const [annotations, setAnnotations] = useState<NarrativeAnnotation[]>([]);
  const [generationNumber, setGenerationNumber] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGenerationLimit, setIsGenerationLimit] = useState<boolean>(false);

  const contextRef = useRef<ExtensionContextValue>(context);
  const pollStartRef = useRef<number>(0);
  const pollRetryCountRef = useRef<number>(0);

  // Keep contextRef fresh as context changes
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  // Polling effect: only active when phase === 'generating' and generationId is set
  useEffect(() => {
    if (phase !== 'generating' || !generationId) {
      return;
    }

    pollStartRef.current = Date.now();
    pollRetryCountRef.current = 0;

    const interval = setInterval(async () => {
      // Check if we've exceeded the max poll duration
      if (Date.now() - pollStartRef.current > MAX_POLL_DURATION_MS) {
        clearInterval(interval);
        setErrorMessage('Narrative generation timed out. Please try again.');
        setPhase('error');
        return;
      }

      try {
        const statusResponse = await fetchBackend<StatusResponse>(
          `/api/narratives/${generationId}/status`,
          contextRef.current,
        );

        if (statusResponse.status === 'completed') {
          clearInterval(interval);
          setNarrative(statusResponse.narrative);
          setAnnotations(statusResponse.annotations);
          onEditedNarrativeChange(statusResponse.narrative);
          setPhase('review');
        } else if (statusResponse.status === 'failed') {
          clearInterval(interval);
          setErrorMessage(statusResponse.error);
          setPhase('error');
        }
        // 'pending' => keep polling
      } catch {
        pollRetryCountRef.current += 1;
        if (pollRetryCountRef.current >= 3) {
          clearInterval(interval);
          setErrorMessage('Network error while checking generation status. Please try again.');
          setPhase('error');
        }
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [phase, generationId, onEditedNarrativeChange]);

  const handleGenerate = useCallback(async (merchantFeedback: string) => {
    setPhase('generating');
    setErrorMessage(null);
    setIsGenerationLimit(false);

    try {
      const response = await fetchBackend<{ generation_id: string }>(
        '/api/narratives/generate',
        contextRef.current,
        {
          dispute_id: dispute.id,
          reason_code: dispute.reason_code,
          network: dispute.network,
          merchant_feedback: merchantFeedback,
        },
      );

      setGenerationId(response.generation_id);
      setGenerationNumber((prev) => prev + 1);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429 && err.code === 'generation_limit') {
        setIsGenerationLimit(true);
        setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      setPhase('error');
    }
  }, [dispute.id, dispute.reason_code, dispute.network]);

  const handleApprove = useCallback(() => {
    onApprove(editedNarrative);
  }, [onApprove, editedNarrative]);

  const handleRegenerate = useCallback((merchantFeedback: string) => {
    handleGenerate(merchantFeedback);
  }, [handleGenerate]);

  const handleRetry = useCallback(() => {
    setErrorMessage(null);
    setPhase('idle');
  }, []);

  const handleErrorContinue = useCallback(() => {
    onApprove(editedNarrative);
  }, [onApprove, editedNarrative]);

  // Post-submission: render narrative in read-only mode regardless of local phase state
  if (submitted) {
    return (
      <NarrativeReview
        narrative={editedNarrative}
        annotations={annotations}
        editedNarrative={editedNarrative}
        generationNumber={generationNumber}
        onEditChange={onEditedNarrativeChange}
        onApprove={handleApprove}
        onRegenerate={handleRegenerate}
        submitted
      />
    );
  }

  switch (phase) {
    case 'idle':
      return (
        <NarrativePreGeneration
          dispute={dispute}
          playbook={playbook}
          evidenceFiles={evidenceFiles}
          generationNumber={generationNumber}
          onGenerate={handleGenerate}
          onNavigateBack={onNavigateBack}
        />
      );

    case 'generating':
      return (
        <NarrativeGenerating dispute={dispute} />
      );

    case 'review':
      return (
        <NarrativeReview
          narrative={narrative}
          annotations={annotations}
          editedNarrative={editedNarrative}
          generationNumber={generationNumber}
          onEditChange={onEditedNarrativeChange}
          onApprove={handleApprove}
          onRegenerate={handleRegenerate}
        />
      );

    case 'error':
      return (
        <NarrativeError
          dispute={dispute}
          playbook={playbook}
          errorMessage={errorMessage}
          editedNarrative={editedNarrative}
          isGenerationLimit={isGenerationLimit}
          onEditChange={onEditedNarrativeChange}
          onContinue={handleErrorContinue}
          onRetry={handleRetry}
        />
      );
  }
};

export default NarrativePanel;
