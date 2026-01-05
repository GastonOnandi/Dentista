package com.ProyectoWilson.demo.DTO.Response;

import java.util.List;

public record ClienteInfoResponseDTO(
        String nombre,
        String ultimaVisita,
        Long telefono,
        String direccion,
        String avatarUrl,
        List<ClienteConsideracionResponseDTO> alergias,
        List<ClienteConsideracionResponseDTO> medicaciones
        ) {
}
