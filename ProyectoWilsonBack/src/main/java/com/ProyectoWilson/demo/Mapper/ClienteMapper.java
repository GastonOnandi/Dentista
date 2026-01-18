package com.ProyectoWilson.demo.Mapper;

import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteConsideracionResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteInfoResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.ClienteConsideracion;
import com.ProyectoWilson.demo.Entities.Turno;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class ClienteMapper {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteConsideracionMapper consideracionMapper;

    public Cliente toEntity(ClienteRequestDTO dto){
        Cliente cliente = new Cliente();
        cliente.setCedula(dto.getCedula());
        cliente.setNombre(dto.getNombre());
        cliente.setTelefono(dto.getTelefono());
        cliente.setDireccion(dto.getDireccion());
        return cliente;
    }

    public ClienteResponseDTO toResponseDTO(Cliente cliente){
        ClienteResponseDTO dto = new ClienteResponseDTO();
        dto.setCedula(cliente.getCedula());
        dto.setNombre(cliente.getNombre());
        dto.setDireccion(cliente.getDireccion());
        dto.setTelefono(cliente.getTelefono());
        dto.setDeuda(cliente.getDeuda());
        return dto;
    }

    public ClienteInfoResponseDTO toClienteInfoResponseDTO(Cliente cliente){
        ClienteInfoResponseDTO dto = new ClienteInfoResponseDTO(
                cliente.getCedula(), 
                cliente.getNombre(),
                obtenerUltimaVisita(cliente.getCedula()),
                cliente.getTelefono(),
                cliente.getDireccion(),
                cliente.getAvatarUrl(),
                cliente.getDeuda(),
                obtenerAlergias(cliente.getCedula()),
                obtenerMedicacion(cliente.getCedula())
        );
        return dto;
    }

    public String obtenerUltimaVisita(Long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(ClienteNoExiste::new);
        List<Turno>turnos = cliente.getTurnos();
        Turno candidato = null;
        LocalDate hoy = LocalDate.now();

        for(Turno turno: turnos){
            if (turno.getFecha().isAfter(hoy)){
                continue;
            }
            if (candidato == null){
                candidato = turno;
            }
            else{
                if (turno.getFecha().isAfter(candidato.getFecha())){
                    candidato = turno;
                }
            }
            if (candidato == null){
                return null;
            }
        }
        return candidato.getFecha().toString();
    }

    public List<ClienteConsideracionResponseDTO> obtenerAlergias(Long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(ClienteNoExiste::new);
        List<ClienteConsideracion> alergias = cliente.getConsideraciones();
        List<ClienteConsideracionResponseDTO> retornar = new ArrayList<>();

        for (ClienteConsideracion consideracion: cliente.getConsideraciones()){
            if (consideracion.getTipo().equals("Alergia")){
                alergias.add(consideracion);
            }
        }
        for (ClienteConsideracion consideracion: alergias){
            retornar.add(consideracionMapper.toResponseDTO(consideracion));
        }
        return retornar;
    }

    public List<ClienteConsideracionResponseDTO> obtenerMedicacion(Long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(ClienteNoExiste::new);
        List<ClienteConsideracion> medicaciones = cliente.getConsideraciones();
        List<ClienteConsideracionResponseDTO> retornar = new ArrayList<>();

        for (ClienteConsideracion consideracion: cliente.getConsideraciones()){
            if (consideracion.getTipo().equals("Medicamento")){
                medicaciones.add(consideracion);
            }
        }
        for (ClienteConsideracion consideracion: medicaciones){
            retornar.add(consideracionMapper.toResponseDTO(consideracion));
        }
        return retornar;
    }


}


