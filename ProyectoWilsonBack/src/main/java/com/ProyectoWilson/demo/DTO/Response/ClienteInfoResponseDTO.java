package com.ProyectoWilson.demo.DTO.Response;

import java.util.List;

public record ClienteInfoResponseDTO(
        Long cedula,
        String nombre,
        String ultimaVisita,
        Long telefono,
        String direccion,
        String avatarUrl,
        Long deuda,
        List<ClienteConsideracionResponseDTO> alergias,
        List<ClienteConsideracionResponseDTO> medicaciones
        ) {
}
