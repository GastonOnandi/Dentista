package com.ProyectoWilson.demo.Entities.Historico;

import com.ProyectoWilson.demo.Entities.Cliente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @Column(nullable = false)
    private LocalDate fechaModificacion;

    @Column(nullable = false)
    private String tipoModificacion;

    private String nombreViejo;
    private Long telefonoViejo;
    private String direccionVieja;
    private Long deudaAnterior;
    private String nombreNuevo;
    private Long telefonoNuevo;
    private String direccionNueva;
    private Long deudaNueva;
}
