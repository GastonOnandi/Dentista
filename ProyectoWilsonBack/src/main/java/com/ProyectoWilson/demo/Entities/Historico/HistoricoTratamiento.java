package com.ProyectoWilson.demo.Entities.Historico;

import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.Tratamiento;
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
public class HistoricoTratamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tratamiento_id", nullable = false)
    private Tratamiento tratamiento;

    @Column(nullable = false)
    private LocalDate fechaModificacion;

    @Column(nullable = false)
    private String tipoModificacion;

    private String nombreViejo;
    private Long costoViejo;
    private String nombreNuevo;
    private Long costoNuevo;
}
