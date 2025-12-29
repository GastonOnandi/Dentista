package com.ProyectoWilson.demo.Controller;

import com.ProyectoWilson.demo.DTO.Request.ClienteConsideracionRequestDTO;
import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping ("/registrar")
    public ResponseEntity<ClienteResponseDTO> registrarCliente(@Valid @RequestBody ClienteRequestDTO dto) {
        ClienteResponseDTO response = clienteService.registrarCliente(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}/modificar")
    public ResponseEntity<Void> modificarCliente(@PathVariable Long id, @Valid @RequestBody ClienteRequestDTO dto) {
        clienteService.modificarCliente(id, dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{idCliente}/tratamientos/{idTratamiento}")
    public ResponseEntity<Void> agregarTratamientoRealizado(@PathVariable Long idCliente, @PathVariable Long idTratamiento, @RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        clienteService.agregarTratamientoRealizado(idCliente, idTratamiento, fecha);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/mostrar")
    public ResponseEntity<List<ClienteResponseDTO>> mostrarClientes() {
        List<ClienteResponseDTO> clientes = clienteService.mostrarClientes();
        return ResponseEntity.ok(clientes);
    }
    @PutMapping("/{idCliente}/tratamientos/{idTratamiento}/pagar")
    public ResponseEntity<Void> pagarTratamiento(@PathVariable Long idCliente, @PathVariable Long idTratamiento, @RequestBody Long monto) {
        clienteService.pagarTratamiento(idCliente, idTratamiento, monto);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{idCliente}/tratamientos/deuda")
    public ResponseEntity<List<DeudaTratamientoDTO>> obtenerDetallesTratamientos(@PathVariable Long idCliente) {
        List<DeudaTratamientoDTO> detalles = clienteService.obtenerDeudaTratamientos(idCliente);
        return ResponseEntity.ok(detalles);
    }


    @PostMapping("/agregar/{idCliente}")
    public ResponseEntity<String> agregarConsideracion(@RequestBody ClienteConsideracionRequestDTO dto, @PathVariable Long idCliente) {
        clienteService.agregarConsideracion(dto.getTipo(), dto.getDetalle(), idCliente);
        return ResponseEntity.ok("Consideración agregada exitosamente");
    }

    @PutMapping("/editar/{idConsideracion}")
    public ResponseEntity<String> editarConsideracion(@PathVariable Long idConsideracion, @RequestBody ClienteConsideracionRequestDTO dto) {
        clienteService.editarConsideracion(dto.getTipo(), dto.getDetalle(), idConsideracion);
        return ResponseEntity.ok("Consideración editada exitosamente");
    }

    @DeleteMapping("/eliminar/{idCliente}/{idConsideracion}")
    public ResponseEntity<String> eliminarConsideracion(@PathVariable Long idCliente, @PathVariable Long idConsideracion) {
        clienteService.eliminarConsideracion(idCliente, idConsideracion);
        return ResponseEntity.ok("Consideración eliminada exitosamente");
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<TurnoResponseDTO>> obtenerTurnosPorCliente(@PathVariable Long idCliente) {
        List<TurnoResponseDTO> citas = clienteService.citasPorCliente(idCliente);
        return ResponseEntity.ok(citas);
    }
}
