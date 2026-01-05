package com.ProyectoWilson.demo.Controller;

import com.ProyectoWilson.demo.DTO.Request.RangoDeFechas;
import com.ProyectoWilson.demo.DTO.Request.TurnoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnosPorDia;
import com.ProyectoWilson.demo.Service.Interfaces.TurnoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/turno")
@CrossOrigin(origins = "http://localhost:5173")
public class TurnoController {
    @Autowired
    private TurnoService turnoService;

    @PostMapping("/agendar")
    public ResponseEntity<TurnoResponseDTO> agendarTurno(@Valid @RequestBody TurnoRequestDTO dto) {
        TurnoResponseDTO response = turnoService.agendarTurno(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{idTurno}/reprogramar")
    public ResponseEntity<Void> reprogramarTurno(@PathVariable Long idTurno, @Valid @RequestBody TurnoRequestDTO dto) {
        turnoService.reprogramarTurno(idTurno, dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{idTurno}/cancelar")
    public ResponseEntity<Void> cancelarTurno(@PathVariable Long idTurno) {
        turnoService.cancelarTurno(idTurno);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<TurnoResponseDTO>> obtenerPorCliente(@PathVariable Long idCliente) {
        List<TurnoResponseDTO> turnos = turnoService.obtenerPorCliente(idCliente);
        return ResponseEntity.ok(turnos);
    }

    @GetMapping("/fechas")
    public ResponseEntity<?> obtenerPorFechas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin
    ) {
        try {
            RangoDeFechas rangoDeFechas = new RangoDeFechas(inicio, fin);
            List<TurnoResponseDTO> turnos = turnoService.obtenerPorFechas(rangoDeFechas);
            return ResponseEntity.ok(turnos);
        } catch (Exception e) {
            e.printStackTrace(); // Esto mostrará el error en la consola
            return ResponseEntity.status(500).body(Map.of(
                    "error", e.getMessage(),
                    "type", e.getClass().getName(),
                    "cause", e.getCause() != null ? e.getCause().getMessage() : "No cause"
            ));
        }
    }

    @GetMapping("/existe")
    public ResponseEntity<Boolean> existeTurnoEnHorario(@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fecha) {
        boolean existe = turnoService.existeTurnoEnHorario(fecha);
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/proximos")
    public ResponseEntity<List<TurnosPorDia>> obtenerTurnosProximosAgrupados() {
        List<TurnosPorDia> turnos = turnoService.obtenerTurnosAgrupados();
        return ResponseEntity.ok(turnos);
    }
}
