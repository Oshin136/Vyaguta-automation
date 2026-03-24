import {test, expect,request} from '@playwright/test';
import { ApplyAttendanceService } from '../../pageServices/Attendance/ApplyAttendanceService';
import { LoginService } from '../../pageServices/LoginService';
import {fetchTokens} from '../../utils/authenticate';
import { validWorklogData } from '../../utils/testData';
import { ReleaseModalService } from '../../pageServices/ReleaseModalService';
import { FillWorklogService } from '../../pageServices/Attendance/FillWorklogService';

test.beforeEach(async ({ page }) => {
  // Authentication setup
  const apiRequestContext = await request.newContext();
  const { accessToken } = await fetchTokens(apiRequestContext);
  
  // Login
  const loginService = new LoginService(page);
  await loginService.loginWithToken(accessToken);
  
  // Close release modal if it appears
  const releaseModalService = new ReleaseModalService(page);
  await releaseModalService.closeReleaseModal();
});

test('Should apply attendance for office and fill worklog from floating icon @positiveCase', async ({ page }) => {
    const applyAttendanceService = new ApplyAttendanceService(page);
    await applyAttendanceService.navigateToAttendancePage();
    const releaseModalService = new ReleaseModalService(page);
    await releaseModalService.closeReleaseModal();
    await applyAttendanceService.applyForOffice();
    // expect(await applyAttendanceService.verifyAttendanceApplied()).toBeTruthy();
    const fillWorklogService = new FillWorklogService(page);
    await fillWorklogService.fillWorklog(validWorklogData);
    await fillWorklogService.cancelWorklog();
    // Add assertions to verify successful application
});

test('Should apply attendance for remote and fill worklog from floating icon @positiveCase', async ({ page }) => {
    const applyAttendanceService = new ApplyAttendanceService(page);
    await applyAttendanceService.navigateToAttendancePage();
    const releaseModalService = new ReleaseModalService(page);
    await releaseModalService.closeReleaseModal();
    await applyAttendanceService.applyForRemote();
    // expect(await applyAttendanceService.verifyAttendanceApplied()).toBeTruthy();
    const fillWorklogService = new FillWorklogService(page);
    await fillWorklogService.fillWorklog(validWorklogData);
    await fillWorklogService.cancelWorklog();
    // Add assertions to verify successful application
});


