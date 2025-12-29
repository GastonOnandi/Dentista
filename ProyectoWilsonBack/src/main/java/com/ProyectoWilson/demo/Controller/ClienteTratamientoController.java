package com.ProyectoWilson.demo.Controller;

import com.ProyectoWilson.demo.DTO.Request.RangoDeFechas;
import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;
import com.ProyectoWilson.demo.Entities.ClienteTratamiento;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteTratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/clientetratamiento")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteTratamientoController {
    @Autowired
    private ClienteTratamientoService clienteTratamientoService;
    @GetMapping("/deudas")
    public ResponseEntity<List<DeudaTratamientoDTO>> obtenerTodasLasDeudas() {
        List<DeudaTratamientoDTO> response = clienteTratamientoService.obtenerTodasLasDeudas();
        return ResponseEntity.ok(response);
    }

    /** Solo deudas pendientes */
    @GetMapping("/deudas/pendientes")
    public ResponseEntity<List<DeudaTratamientoDTO>> obtenerDeudasPendientes() {
        List<DeudaTratamientoDTO> response = clienteTratamientoService.obtenerDeudasPendientes();
        return ResponseEntity.ok(response);
    }

    /** Deudas por estado concreto: PAID / PENDING / UNPAID */
    @GetMapping("/deudas/estado/{estado}")
    public ResponseEntity<List<DeudaTratamientoDTO>> obtenerDeudasPorEstado(@PathVariable String estado) {
        List<DeudaTratamientoDTO> response = clienteTratamientoService.obtenerDeudasPorEstado(estado);
        return ResponseEntity.ok(response);
    }


    // ==========================
    //    FILTROS / CONSULTAS
    // ==========================

    /** Todos los tratamientos de un cliente */
    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<DeudaTratamientoDTO>> obtenerPorCliente(@PathVariable Long idCliente) {
        return ResponseEntity.ok(clienteTratamientoService.obtenerDeudasPorCliente(idCliente));
    }

    /** Todos los tratamientos por tipo de tratamiento */
    @GetMapping("/tratamiento/{idTratamiento}")
    public ResponseEntity<List<ClienteTratamiento>> obtenerPorTratamiento(@PathVariable Long idTratamiento) {
        return ResponseEntity.ok(clienteTratamientoService.obtenerPorTratamiento(idTratamiento));
    }

    /** Tratamientos realizados en una fecha */
    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<ClienteTratamiento>> obtenerPorFecha(@PathVariable String fecha) {
        LocalDate date = LocalDate.parse(fecha);
        return ResponseEntity.ok(clienteTratamientoService.obtenerPorFecha(date));
    }

    /** Tratamientos en rango de fechas */
    @GetMapping("/fechas")
    public ResponseEntity<List<ClienteTratamiento>> obtenerPorRangoDeFechas(RangoDeFechas rangoDeFechas) {
        LocalDate fechaInicio = rangoDeFechas.getInicio();
        LocalDate fechaFin = rangoDeFechas.getFin();
        return ResponseEntity.ok(clienteTratamientoService.obtenerPorRangoDeFechas(fechaInicio, fechaFin));
    }
}
