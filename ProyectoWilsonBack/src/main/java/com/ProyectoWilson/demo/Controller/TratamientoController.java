package com.ProyectoWilson.demo.Controller;

import com.ProyectoWilson.demo.DTO.Request.TratamientoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TratamientoResponseDTO;
import com.ProyectoWilson.demo.Service.Interfaces.TratamientoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tratamiento")
@CrossOrigin(origins = "http://localhost:5173")
public class TratamientoController {
    @Autowired
    private TratamientoService tratamientoService;

    @PostMapping("/registrar")
    public ResponseEntity<TratamientoResponseDTO> registrarTratamiento(@Valid @RequestBody TratamientoRequestDTO dto) {
        TratamientoResponseDTO response = tratamientoService.registrarTratamiento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<TratamientoResponseDTO>> listarTratamientos() {
        List<TratamientoResponseDTO> tratamientos = tratamientoService.listarTratamientos();
        return ResponseEntity.ok(tratamientos);
    }

    @PutMapping("/{id}/actualizar")
    public ResponseEntity<Void> actualizarTratamiento(@PathVariable Long id, @Valid @RequestBody TratamientoRequestDTO dto) {
        tratamientoService.actualizarTratamiento(id, dto);
        return ResponseEntity.noContent().build();
    }

}
