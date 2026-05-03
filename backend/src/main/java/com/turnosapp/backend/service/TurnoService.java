package com.turnosapp.backend.service;

import com.turnosapp.backend.model.Turno;
import com.turnosapp.backend.repository.TurnoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TurnoService {

    private final TurnoRepository turnoRepository;

    public List<Turno> obtenerTodos() {
        return turnoRepository.findAll();
    }

    public Optional<Turno> obtenerPorId(String id) {
        return turnoRepository.findById(id);
    }

    public List<Turno> obtenerPorCliente(String clienteId) {
        return turnoRepository.findByClienteId(clienteId);
    }

    public List<Turno> obtenerPorEstado(String estado) {
        return turnoRepository.findByEstado(estado);
    }

    public List<Turno> obtenerPorRangoFecha(LocalDateTime inicio, LocalDateTime fin) {
        return turnoRepository.findByFechaHoraBetween(inicio, fin);
    }

    public Turno crear(Turno turno) {
        turno.setEstado("PENDIENTE");
        turno.setFechaCreacion(LocalDateTime.now());
        return turnoRepository.save(turno);
    }

    public Optional<Turno> actualizarEstado(String id, String nuevoEstado) {
        return turnoRepository.findById(id).map(turno -> {
            turno.setEstado(nuevoEstado);
            return turnoRepository.save(turno);
        });
    }

    public Optional<Turno> actualizar(String id, Turno turnoActualizado) {
        return turnoRepository.findById(id).map(turno -> {
            turno.setFechaHora(turnoActualizado.getFechaHora());
            turno.setClienteId(turnoActualizado.getClienteId());
            turno.setProfesionalId(turnoActualizado.getProfesionalId());
            turno.setTratamientoId(turnoActualizado.getTratamientoId());
            turno.setSede(turnoActualizado.getSede());
            turno.setNotas(turnoActualizado.getNotas());
            return turnoRepository.save(turno);
        });
    }

    public boolean cancelar(String id) {
        return turnoRepository.findById(id).map(turno -> {
            turno.setEstado("CANCELADO");
            turnoRepository.save(turno);
            return true;
        }).orElse(false);
    }

    public boolean eliminar(String id) {
    return turnoRepository.findById(id).map(turno -> {
        turnoRepository.deleteById(id);
        return true;
    }).orElse(false);
}

}
