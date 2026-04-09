// ─────────────────────────────────────────────────────────────────────────────
//  FISIOCAN — Google Apps Script
//  Copia este código en tu editor de Apps Script (script.google.com),
//  despliega como aplicación web:
//    • Ejecutar como: Yo (tu cuenta)
//    • Quién tiene acceso: Cualquier persona
//  Copia la nueva URL y ponla en la variable SCRIPT de index.html
// ─────────────────────────────────────────────────────────────────────────────

var HEADERS = [
  'Fecha y hora',
  'Tipo paciente',
  // Paciente
  'Nombre animal', 'Especie / Raza', 'Edad / Fecha nacimiento',
  'Peso', 'Sexo', 'Esterilizado',
  // Propietario
  'Nombre tutor', 'Teléfono', 'Email', 'Cómo nos conoció',
  // Motivo
  'Motivo consulta', 'Desde cuándo', 'Inicio síntomas', 'Momentos peor/mejor',
  // Síntomas
  'Síntomas observados', 'Dolor al comer',
  // Antecedentes
  'Lesiones previas', 'Cirugía previa', 'Detalle cirugía', 'Diagnóstico previo',
  // Tratamientos
  'Medicación', 'Detalle medicación',
  'Fisioterapia previa', 'Detalle fisioterapia',
  'Mejora con', 'Veterinario referencia',
  // Estilo de vida
  'Nivel actividad', 'Tipo paseos', 'Dónde duerme', 'Escaleras',
  // Observaciones
  'Observaciones tutor', 'Objetivos tratamiento'
];

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Crear cabeceras con formato si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      var hr = sheet.getRange(1, 1, 1, HEADERS.length);
      hr.setFontWeight('bold');
      hr.setBackground('#1a2e5a');
      hr.setFontColor('#ffffff');
      hr.setFontSize(11);
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, HEADERS.length, 160);
    }

    var d = e.parameter;

    sheet.appendRow([
      new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
      d.tipo                || '',
      d.nombreAnimal        || '',
      d.especieRaza         || '',
      d.edadNacimiento      || '',
      d.peso                || '',
      d.sexo                || '',
      d.esterilizado        || '',
      d.nombreTutor         || '',
      d.telefono            || '',
      d.email               || '',
      d.comoNosConocio      || '',
      d.motivoConsulta      || '',
      d.desdeCuando         || '',
      d.inicioSintomas      || '',
      d.momentosPeorMejor   || '',
      d.sintomasObservados  || '',
      d.dolorAlComer        || '',
      d.lesionesPrevias     || '',
      d.cirugiaPrevia       || '',
      d.cirugiaDetalle      || '',
      d.diagnosticoPrevio   || '',
      d.medicacion          || '',
      d.medicacionDetalle   || '',
      d.fisioterapiaPrevia  || '',
      d.fisioterapiaDetalle || '',
      d.mejoriaCon          || '',
      d.veterinarioRef      || '',
      d.nivelActividad      || '',
      d.tipoPaseos          || '',
      d.dondeDuerme         || '',
      d.escaleras           || '',
      d.observaciones       || '',
      d.objetivos           || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log(err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', app: 'FISIOCAN' }))
    .setMimeType(ContentService.MimeType.JSON);
}
