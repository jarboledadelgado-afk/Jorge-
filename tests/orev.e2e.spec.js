const { test, expect } = require('@playwright/test');

async function onboard(page, name='QA OREV') {
  await page.goto('./');
  await expect(page.locator('#boot-fallback')).toBeHidden();
  await expect(page.locator('#obName')).toBeVisible();
  await page.locator('#obName').fill(name);
  await page.locator('#obGoal').fill('Organizar trabajo y decisiones sin inventar urgencias');
  await page.getByRole('button', { name: 'Empezar mi Centro' }).click();
  await expect(page.getByRole('heading', { name: new RegExp('Hola') })).toBeVisible();
}

test('USER_ACCEPTANCE_JOURNEY_01 core end-to-end', async ({ page }) => {
  await onboard(page);

  await page.getByRole('button', { name: /Capturar algo/ }).click();
  await page.locator('#tText').fill('Preparar informe QA');
  await page.locator('#tStatus').selectOption({ label: 'AHORA' });
  await page.locator('#tPriority').selectOption({ label: 'ALTA' });
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByText('Preparar informe QA')).toBeVisible();

  await page.getByRole('button', { name: 'Editar' }).first().click();
  await page.locator('#tNote').fill('Nota editada por E2E');
  await page.getByRole('button', { name: 'Guardar' }).click();

  await page.getByRole('button', { name: 'Trabajo' }).last().click();
  await page.getByRole('button', { name: /Agenda/ }).click();
  await page.locator('#evTitle').fill('Revisión semanal');
  await page.locator('#evNote').fill('Evento QA');
  await page.getByRole('button', { name: 'Guardar evento' }).click();
  await expect(page.getByText('Revisión semanal')).toBeVisible();

  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Qué me toca hoy/ }).click();
  await expect(page.getByText('Preparar informe QA')).toBeVisible();
  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Estoy saturada/ }).click();
  await expect(page.getByText('Preparar informe QA')).toBeVisible();

  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Hiperfoco/ }).click();
  await page.locator('#focusTask').selectOption({ label: 'Preparar informe QA' });
  await page.getByRole('button', { name: 'Iniciar' }).click();
  await expect(page.getByText(/RUNNING/)).toBeVisible();
  await page.getByRole('button', { name: 'Pausar' }).click();
  await expect(page.getByText(/PAUSED/)).toBeVisible();
  await page.getByRole('button', { name: 'Reanudar' }).click();
  await expect(page.getByText(/RUNNING/)).toBeVisible();
  await page.getByRole('button', { name: 'Finalizar' }).click();
  await expect(page.getByText(/FINISHED/)).toBeVisible();

  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Buscar/ }).click();
  await page.locator('#searchQ').fill('informe');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByText(/Tarea: Preparar informe QA/)).toBeVisible();

  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Quiero ordenar lo que me pasa/ }).click();
  await page.locator('#clarityInitial').fill('Quiero entender por qué me cuesta acercarme cuando alguien muestra interés genuino.');
  await page.getByRole('button', { name: 'Empezar' }).click();
  await page.locator('#clarityAnswer').fill('No sé si sea miedo al amor o miedo al rechazo.');
  await page.getByRole('button', { name: /Responder y crear mapa/ }).click();
  await expect(page.getByRole('heading', { name: 'Mapa v1' })).toBeVisible();
  await page.getByRole('button', { name: 'EN PARTE' }).click();
  await page.locator('#clarityCorrection').fill('Sí encaja el miedo al rechazo, pero quiero diferenciarlo del miedo a vincularme.');
  await page.getByRole('button', { name: 'Actualizar mapa' }).click();
  await expect(page.getByRole('heading', { name: 'Mapa v2' })).toBeVisible();
  await expect(page.getByText('Podría existir temor al rechazo.')).toBeVisible();
  await expect(page.getByText('Podría existir temor relacionado con vincularse afectivamente.')).toBeVisible();

  await page.getByRole('button', { name: 'Salir a Inicio' }).click();
  await page.getByRole('button', { name: /Quiero ordenar lo que me pasa/ }).click();
  await expect(page.getByRole('heading', { name: 'Mapa v2' })).toBeVisible();

  await page.reload();
  await page.getByRole('button', { name: /Quiero ordenar lo que me pasa/ }).click();
  await expect(page.getByRole('heading', { name: 'Mapa v2' })).toBeVisible();

  await page.getByRole('button', { name: 'SÍ' }).click();
  await page.getByRole('button', { name: 'Proponer técnica' }).click();
  await page.getByRole('button', { name: 'Crear microacción' }).click();
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
  await expect(page.getByRole('heading', { name: 'Sesiones anteriores' })).toBeVisible();
  await expect(page.getByText(/Quiero entender por qué/)).toBeVisible();
});

test('profile and task survive reload', async ({ page }) => {
  await onboard(page, 'Persistencia QA');
  await page.getByRole('button', { name: /Capturar algo/ }).click();
  await page.locator('#tText').fill('Dato persistente');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.reload();
  await expect(page.getByText('Hola, Persistencia QA')).toBeVisible();
  await page.getByRole('button', { name: 'Trabajo' }).last().click();
  await page.getByRole('button', { name: 'Pendientes' }).click();
  await expect(page.getByText('Dato persistente')).toBeVisible();
});

test('HTML-like user input is escaped and not executed', async ({ page }) => {
  await onboard(page);
  await page.getByRole('button', { name: /Capturar algo/ }).click();
  await page.locator('#tText').fill('<script>window.__xss=1</script>');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByText('<script>window.__xss=1</script>')).toBeVisible();
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
});

test('responsive has no horizontal overflow on tested viewport', async ({ page }) => {
  await onboard(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
});

test('backup export and restore roundtrip restores mutated state', async ({ page }) => {
  await onboard(page, 'Backup QA');
  await page.getByRole('button', { name: /Capturar algo/ }).click();
  await page.locator('#tText').fill('Tarea que debe volver');
  await page.getByRole('button', { name: 'Guardar' }).click();

  await page.locator('button[aria-label="Ajustes"]').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar respaldo JSON' }).click();
  const download = await downloadPromise;
  const backupPath = await download.path();
  expect(backupPath).toBeTruthy();

  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: 'Trabajo' }).last().click();
  await page.getByRole('button', { name: 'Pendientes' }).click();
  await page.getByRole('button', { name: 'Eliminar' }).first().click();
  await expect(page.getByText('Tarea que debe volver')).toHaveCount(0);

  await page.locator('button[aria-label="Ajustes"]').click();
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#backupFile').setInputFiles(backupPath);
  await expect(page.getByRole('heading', { name: 'Ajustes' })).toBeVisible();
  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: 'Trabajo' }).last().click();
  await page.getByRole('button', { name: 'Pendientes' }).click();
  await expect(page.getByText('Tarea que debe volver')).toBeVisible();
});

test('synthetic v0.9 storage migrates into v0.10 without losing compatible data', async ({ page }) => {
  await page.goto('./');
  const oldState = {
    schemaVersion: 9,
    appVersion: '0.9-rc',
    initialized: true,
    profile: { name: 'Migración QA', goal: 'Conservar datos', areas: ['Trabajo','Familia','Casa','Yo'] },
    tasks: [{ id:'old-task', text:'Tarea migrada', note:'nota', area:'Trabajo', status:'HOY', priority:'MEDIA', date:'', responsible:'', origin:'manual', done:false }],
    events: [{ id:'old-event', title:'Evento migrado', date:'', note:'', taskId:'', done:false }],
    claritySessions: [{ id:'old-session', status:'active', currentStep:'map', relato:'Relato migrado', questions:['Pregunta'], answers:['Respuesta'], maps:[{version:1,hechos:[],relatos:['Relato migrado'],observaciones:['Observación'],interpretaciones:[],hipotesis:[{text:'Hipótesis migrada',certeza:'BAJA'}],informacionFaltante:['Dato'],validation:null,correction:'',created:new Date().toISOString()}], corrections:[], validation:null }],
    resources: [], settings: { focusMinutes:25 }, activeFocus:null
  };
  await page.evaluate((state) => {
    localStorage.removeItem('orev-universal-v0-10-rc');
    localStorage.setItem('orev-universal-v0-9-rc', JSON.stringify(state));
  }, oldState);
  await page.reload();
  await expect(page.getByText('Hola, Migración QA')).toBeVisible();
  await page.getByRole('button', { name: 'Trabajo' }).last().click();
  await page.getByRole('button', { name: 'Pendientes' }).click();
  await expect(page.getByText('Tarea migrada')).toBeVisible();
  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Quiero ordenar lo que me pasa/ }).click();
  await expect(page.getByRole('heading', { name: 'Mapa v1' })).toBeVisible();
  await expect(page.getByText('Hipótesis migrada')).toBeVisible();
});
