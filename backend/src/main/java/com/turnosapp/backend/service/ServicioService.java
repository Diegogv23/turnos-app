package com.turnosapp.backend.service;

import com.turnosapp.backend.model.Servicio;
import com.turnosapp.backend.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public List<Servicio> obtenerTodos() {
        return servicioRepository.findAll();
    }

    public Optional<Servicio> obtenerPorId(String id) {
        return servicioRepository.findById(id);
    }

    public List<Servicio> obtenerActivos() {
        return servicioRepository.findByActivo(true);
    }

    public List<Servicio> obtenerPorCategoria(String categoria) {
        return servicioRepository.findByCategoria(categoria);
    }

    public List<Servicio> buscar(String nombre) {
        return servicioRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Servicio crear(Servicio servicio) {
        servicio.setActivo(true);
        return servicioRepository.save(servicio);
    }

    public Optional<Servicio> actualizar(String id, Servicio servicioActualizado) {
        return servicioRepository.findById(id).map(servicio -> {
            servicio.setNombre(servicioActualizado.getNombre());
            servicio.setCategoria(servicioActualizado.getCategoria());
            servicio.setDescripcion(servicioActualizado.getDescripcion());
            servicio.setPrecio(servicioActualizado.getPrecio());
            servicio.setDuracionMinutos(servicioActualizado.getDuracionMinutos());
            return servicioRepository.save(servicio);
        });
    }

    public boolean desactivar(String id) {
        return servicioRepository.findById(id).map(servicio -> {
            servicio.setActivo(false);
            servicioRepository.save(servicio);
            return true;
        }).orElse(false);
    }
}