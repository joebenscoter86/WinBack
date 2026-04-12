import { Dispute } from './types';

const TEMPLATE_FIELD_MAP: Record<string, (d: Dispute) => string | undefined> = {
  avs_address_check: (d) => d.avs_address_check,
  avs_zip_check: (d) => d.avs_zip_check,
  cvc_check: (d) => d.cvc_check,
  three_d_secure_result: (d) => d.three_d_secure_result,
  three_d_secure_version: (d) => d.three_d_secure_version,
  authorization_code: (d) => d.authorization_code,
  network_status: (d) => d.network_status,
  customer_email: (d) => d.customer_email,
  customer_name: (d) => d.customer_name,
  billing_address: (d) => d.billing_address,
  charge_description: (d) => d.charge_description,
};

export function interpolateTemplate(template: string, dispute: Dispute): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, field: string) => {
    const accessor = TEMPLATE_FIELD_MAP[field];
    if (!accessor) return 'N/A';
    const value = accessor(dispute);
    return value !== undefined && value !== null && value !== '' ? value : 'N/A';
  });
}
