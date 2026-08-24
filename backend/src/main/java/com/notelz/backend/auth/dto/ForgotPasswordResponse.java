package com.notelz.backend.auth.dto;

/**
 * No email delivery is wired up yet, so the reset link is handed back directly
 * instead of silently disappearing. Swap for a real email send before this ever
 * goes further than a dev/staging environment.
 */
public record ForgotPasswordResponse(
        String message,
        String resetToken
) {}
