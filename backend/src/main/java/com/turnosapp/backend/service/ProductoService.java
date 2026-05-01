package com.turnosapp.backend.service;

import com.turnosapp.backend.model.Producto;
import com.turnosapp.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> obtenerPorId(String id) {
        return productoRepository.findById(id);
    }

    public Producto crear(Producto producto) {
        producto.setActivo(true);
        return productoRepository.save(producto);
    }

    public Optional<Producto> actualizar(String id, Producto productoActualizado) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoActualizado.getNombre());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setStock(productoActualizado.getStock());
            producto.setActivo(productoActualizado.getActivo());
            return productoRepository.save(producto);
        });
    }

    public boolean eliminar(String id) {
        return productoRepository.findById(id).map(producto -> {
            productoRepository.deleteById(id);
            return true;
        }).orElse(false);
    }
}