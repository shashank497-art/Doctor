# Setup Instructions for Clinic Medicine Inventory Management

## 1. Google Sheets Setup
1. Create a new Google Sheet.
2. Rename the first sheet to "Inventory".
3. Add the following headers in row 1:
   - A1: Medicine Name
   - B1: Batch Number
   - C1: Expiry Date
   - D1: Quantity in Stock
   - E1: Minimum Required Quantity
   - F1: Supplier

## 2. Google Apps Script Setup
1. Open the Google Sheet.
2. Go to Extensions > Apps Script.
3. Delete any default code and paste the code from `apps-script.js`.
4. Save the script (Ctrl+S or Cmd+S).
5. Click on "Deploy" > "New deployment".
6. Select type "Web app".
7. Set "Execute as" to "Me".
8. Set "Who has access" to "Anyone".
9. Click "Deploy".
10. Copy the Web App URL provided.

## 3. Frontend Setup
1. Open `medicine.html` in a text editor.
2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'` with the copied Web App URL.
3. Save the file.
4. Open `medicine.html` in a web browser to test.

## 4. Testing
- Add some sample data to the Google Sheet.
- Load the page and verify data appears.
- Test adding, editing, deleting medicines.
- Test search and filter functionality.
- Test CSV export.

## Notes
- Ensure the Google Sheet is shared appropriately if needed.
- The web app does not require login as per requirements.
- All operations use fetch API for communication.
