package com.ProyectoWilson.demo.Controller;

import com.ProyectoWilson.demo.DTO.Request.ClienteConsideracionRequestDTO;
import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Request.DeudaUpdateDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteInfoResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
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
    @PutMapping("/clientetratamiento/{id}/pagar")
    public ResponseEntity<Void> pagarTratamiento(@PathVariable Long id, @RequestBody Long monto) {
        clienteService.pagarTratamiento(id,monto);
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

    @GetMapping("/{cedula}/turnos")
    public ResponseEntity<List<TurnoResponseDTO>> obtenerTurnosPorCliente(@PathVariable Long cedula) {
        List<TurnoResponseDTO> citas = clienteService.citasPorCliente(cedula);
        return ResponseEntity.ok(citas);
    }

    @GetMapping("/{cedula}/info")
    public ResponseEntity<ClienteInfoResponseDTO> obtenerInfoPorId(@PathVariable Long cedula){
        return ResponseEntity.ok(clienteService.obtenerInfoPorId(cedula));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ClienteResponseDTO>> buscarClientes(@RequestParam String q) {
        try {
            List<ClienteResponseDTO> clientes = clienteService.buscarClientes(q);
            return ResponseEntity.ok(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/{cedula}/actualizar-deuda")
    public ResponseEntity<?> actualizarDeuda(
            @PathVariable Long cedula,
            @RequestBody DeudaUpdateDTO deudaDTO) {

        try {
            clienteService.actualizarDeuda(cedula,deudaDTO);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cliente no encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar deuda: " + e.getMessage());
        }
    }
}
