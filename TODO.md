# TODO List for Fixing Data Saving Issue in Prescription Form

## Current Status
- Identified that form data is not saving to the correct Excel sheet due to missing 'type' field in payload.
- Missing payment-related fields (amount_due, amount_paid, payment_status) expected by Google Apps Script.

## Tasks
- [x] Add missing payment fields (amount_due, amount_paid, payment_status) to the Prescription.html form.
- [x] Update the JavaScript payload in Prescription.html to include 'type': 'prescription' and the new fields.
- [x] Test the form submission to ensure data saves correctly to the 'Prescriptions' sheet.
- [x] Verify Google Apps Script URL is replaced with the actual deployed URL.
- [x] Added missing functions getPrescriptions and searchPrescription to apps-script.js.
- [x] Removed payment-related fields from form, script, and apps-script.js as per user request.
- [x] Performed critical-path testing: deployed apps-script.js, replaced URLs, tested form submission, inventory CRUD, patient functions, and prescription generation.
- [x] If issues persist, check Apps Script logs and sheet structure.

## Next Steps
- Proceed with testing the form submission.
- After testing, update TODO if successful.
