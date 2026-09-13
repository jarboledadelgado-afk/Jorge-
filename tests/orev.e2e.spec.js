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

  // Task create
  await page.getByRole('button', { name: /Capturar algo/ }).click();
  await page.locator('#tText').fill('Preparar informe QA');
  await page.locator('#tStatus').selectOption({ label: 'AHORA' });
  await page.locator('#tPriority').selectOption({ label: 'ALTA' });
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByText('Preparar informe QA')).toBeVisible();

  // Task edit
  await page.getByRole('button', { name: 'Editar' }).first().click();
  await page.locator('#tNote').fill('Nota editada por E2E');
  await page.getByRole('button', { name: 'Guardar' }).click();

  // Agenda
  await page.getByRole('button', { name: 'Trabajo' }).last().click();
  await page.getByRole('button', { name: /Agenda/ }).click();
  await page.locator('#evTitle').fill('Revisión semanal');
  await page.locator('#evNote').fill('Evento QA');
  await page.getByRole('button', { name: 'Guardar evento' }).click();
  await expect(page.getByText('Revisión semanal')).toBeVisible();

  // Today and saturation
  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Qué me toca hoy/ }).click();
  await expect(page.getByText('Preparar informe QA')).toBeVisible();
  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Estoy saturada/ }).click();
  await expect(page.getByText('Preparar informe QA')).toBeVisible();

  // Focus
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

  // Search
  await page.getByRole('button', { name: 'Inicio' }).last().click();
  await page.getByRole('button', { name: /Buscar/ }).click();
  await page.locator('#searchQ').fill('informe');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByText(/Tarea: Preparar informe QA/)).toBeVisible();

  // OREV semantic update
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

  // Navigation continuity
  await page.getByRole('button', { name: 'Salir a Inicio' }).click();
  await page.getByRole('button', { name: /Quiero ordenar lo que me pasa/ }).click();
  await expect(page.getByRole('heading', { name: 'Mapa v2' })).toBeVisible();

  // Reload continuity
  await page.reload();
  await page.getByRole('button', { name: /Quiero ordenar lo que me pasa/ }).click();
  await expect(page.getByRole('heading', { name: 'Mapa v2' })).toBeVisible();

  // Close session/history
  await page.getByRole('button', { name: 'SÍ' }).click();
  await page.getByRole('button', { name: 'Proponer técnica' }).click();
  await page.getByRole('button', { name: 'Crear microacción' }).click();
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
  await expect(page.getByRole('heading', { name: 'Sesiones anteriores' })).toBeVisible();
  await expect(page.getByText(/Quiero entender por qué/)).toBeVisible();
});

test('profile, task, event and OREV survive reload', async ({ page }) => {
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
