// Google Apps Script for Medicine Inventory Management

function doGet(e) {
  try {
    if (e.parameter.action === 'getPatients') {
      return getPatients();
    } else if (e.parameter.action === 'searchPatient') {
      return searchPatient(e);
    } else if (e.parameter.action === 'getPrescriptions') {
      return getPrescriptions();
    } else if (e.parameter.action === 'searchPrescription') {
      return searchPrescription(e);
    } else {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
      const data = sheet.getDataRange().getValues();
      const medicines = [];
      for (let i = 1; i < data.length; i++) {
        medicines.push({
          id: i,
          name: data[i][0],
          batch: data[i][1],
          expiry: data[i][2],
          quantity: data[i][3],
          minQuantity: data[i][4],
          supplier: data[i][5]
        });
      }
      return ContentService
        .createTextOutput(JSON.stringify(medicines))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.type === 'prescription') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Prescriptions');
      const newRow = [data.patient, data.phone, data.age, data.gender, data.diagnosis, data.medicines, data.instructions, data.note, data.next_visit, new Date()];
      sheet.appendRow(newRow);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, id: sheet.getLastRow() }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
      const newRow = [data.name, data.batch, data.expiry, data.quantity, data.minQuantity, data.supplier];
      sheet.appendRow(newRow);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPut(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
    const row = data.id + 1; // Since id starts from 1, row starts from 2
    sheet.getRange(row, 1, 1, 6).setValues([[data.name, data.batch, data.expiry, data.quantity, data.minQuantity, data.supplier]]);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doDelete(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
    const row = data.id + 1;
    sheet.deleteRow(row);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Patient functions
function getPatients() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patients');
    const data = sheet.getDataRange().getValues();
    const patients = [];
    for (let i = 1; i < data.length; i++) {
      patients.push({
        id: i,
        name: data[i][0],
        phone: data[i][1],
        age: data[i][2],
        gender: data[i][3],
        address: data[i][4]
      });
    }
    return ContentService
      .createTextOutput(JSON.stringify(patients))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function searchPatient(e) {
  try {
    const query = e.parameter.query;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patients');
    const data = sheet.getDataRange().getValues();
    const patients = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toLowerCase().includes(query.toLowerCase()) || data[i][1].includes(query)) {
        patients.push({
          id: i,
          name: data[i][0],
          phone: data[i][1],
          age: data[i][2],
          gender: data[i][3],
          address: data[i][4]
        });
      }
    }
    return ContentService
      .createTextOutput(JSON.stringify(patients))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getPrescriptions() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Prescriptions');
    const data = sheet.getDataRange().getValues();
    const prescriptions = [];
    for (let i = 1; i < data.length; i++) {
      prescriptions.push({
        id: i,
        patient: data[i][0],
        phone: data[i][1],
        age: data[i][2],
        gender: data[i][3],
        diagnosis: data[i][4],
        medicines: data[i][5],
        instructions: data[i][6],
        note: data[i][7],
        next_visit: data[i][8],
        date: data[i][9]
      });
    }
    return ContentService
      .createTextOutput(JSON.stringify(prescriptions))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function searchPrescription(e) {
  try {
    const query = e.parameter.query;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Prescriptions');
    const data = sheet.getDataRange().getValues();
    const prescriptions = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toLowerCase().includes(query.toLowerCase()) || data[i][1].includes(query)) {
        prescriptions.push({
          id: i,
          patient: data[i][0],
          phone: data[i][1],
          age: data[i][2],
          gender: data[i][3],
          diagnosis: data[i][4],
          medicines: data[i][5],
          instructions: data[i][6],
          note: data[i][7],
          next_visit: data[i][8],
          date: data[i][9]
        });
      }
    }
    return ContentService
      .createTextOutput(JSON.stringify(prescriptions))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
