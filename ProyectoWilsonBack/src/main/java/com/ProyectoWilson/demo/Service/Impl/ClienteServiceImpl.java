package com.ProyectoWilson.demo.Service.Impl;

import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteInfoResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;
import com.ProyectoWilson.demo.Entities.Turno;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteYaExisteException;
import com.ProyectoWilson.demo.Mapper.ClienteMapper;
import com.ProyectoWilson.demo.Mapper.TurnoMapper;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteConsideracionService;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteService;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteTratamientoService;
import com.ProyectoWilson.demo.Service.Interfaces.Historico.HistoricoClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClienteServiceImpl implements ClienteService {
    @Autowired
    private ClienteMapper clienteMapper;
    @Autowired
    private HistoricoClienteService historicoClienteService;
    @Autowired
    private ClienteTratamientoService clienteTratamientoService;

    @Autowired
    private ClienteConsideracionService clienteConsideracionService;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TurnoMapper turnoMapper;
    @Override
    public ClienteResponseDTO registrarCliente(ClienteRequestDTO dto) {
        if (clienteRepository.existsByCedula(dto.getCedula())) {
            throw new ClienteYaExisteException();
        }
        Cliente cliente = clienteMapper.toEntity(dto);
        cliente.setDeuda(0L);
        clienteRepository.save(cliente);
        historicoClienteService.registrarAgregar(cliente);
        return clienteMapper.toResponseDTO(cliente);
    }

    @Override
    public void modificarCliente(Long id, ClienteRequestDTO dto) {
        Cliente clienteViejo = clienteRepository.findById(id).orElseThrow(ClienteNoExiste::new);
        Cliente clienteNuevo = new Cliente();
        clienteNuevo.setNombre(dto.getNombre());
        clienteNuevo.setDireccion(dto.getDireccion());
        clienteNuevo.setTelefono(dto.getTelefono());
        clienteNuevo.setCedula(id);
        clienteNuevo.setHistorico(clienteViejo.getHistorico());
        clienteNuevo.setTurnos(clienteViejo.getTurnos());
        clienteNuevo.setTratamientos(clienteViejo.getTratamientos());
        historicoClienteService.registrarModificacion(clienteViejo,clienteNuevo);
        clienteRepository.save(clienteNuevo);
    }

    @Override
    public void agregarTratamientoRealizado(Long idCliente, Long idTratamiento, LocalDate fecha) {
        clienteTratamientoService.asociarTratamiento(idCliente, idTratamiento, fecha);
    }

    @Override
    public List<ClienteResponseDTO> mostrarClientes(){
        List<Cliente> clientes = clienteRepository.findAll();
        List<ClienteResponseDTO>retornar = new ArrayList<>();
        for (Cliente cliente: clientes){
            retornar.add(clienteMapper.toResponseDTO(cliente));
        }
        return retornar;
    }

    @Override
    public void pagarTratamiento(Long idCliente,Long idTratamiento ,Long monto){
        clienteTratamientoService.pagarDeuda(idCliente,idTratamiento,monto);
    }

    @Override
    public List<DeudaTratamientoDTO> obtenerDeudaTratamientos(Long idCliente) {
        return clienteTratamientoService.obtenerDeudasPorCliente(idCliente);
    }



    @Override
    public void agregarConsideracion(TipoConsideracion tipo, String detalle, Long idCliente){
        clienteConsideracionService.agregarConsideracion(tipo,detalle,idCliente);
    }
    @Override
    public void editarConsideracion(TipoConsideracion tipo, String detalle, Long idConsideracion){
        clienteConsideracionService.editarConsideracion(tipo,detalle,idConsideracion);
    }
    @Override
    public void eliminarConsideracion(Long idCliente, Long idConsideracion){
        clienteConsideracionService.eliminarConsideracion(idCliente,idConsideracion);
    }

    @Override
    public List<TurnoResponseDTO> citasPorCliente(Long idCliente) {
        Cliente cliente = clienteRepository.findById(idCliente).orElseThrow(ClienteNoExiste::new);
        List<Turno> turnos = cliente.getTurnos();
        List<TurnoResponseDTO> retornar = new ArrayList<>();
        for (Turno turno: turnos){
            retornar.add(turnoMapper.toResponseDTO(turno));
        }
        return retornar;
    }

    @Override
    public ClienteInfoResponseDTO obtenerInfoPorId(Long idCliente) {
        Cliente cliente = clienteRepository.findById(idCliente).orElseThrow(()-> new ClienteNoExiste());
        ClienteInfoResponseDTO dto = clienteMapper.toClienteInfoResponseDTO(cliente);
        return dto;
    }


    @Override
    public List<ClienteResponseDTO> buscarClientes(String query) {
        if (query == null || query.trim().isEmpty()) {
            return new ArrayList<>();
        }

        List<Cliente> clientes = clienteRepository.findByNombreContainingIgnoreCase(query);

        List<ClienteResponseDTO> clientesDTO = new ArrayList<>();
        for (Cliente cliente : clientes) {
            ClienteResponseDTO dto = clienteMapper.toResponseDTO(cliente);
            clientesDTO.add(dto);
        }

        return clientesDTO;
    }


}

