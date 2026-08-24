package com.notelz.backend.auth.dto;

public record AuthResponse(
        String token,
        String email,
        String displayName,
        String role
) {}
