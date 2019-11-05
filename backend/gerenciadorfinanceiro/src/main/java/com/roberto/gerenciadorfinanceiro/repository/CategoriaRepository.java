package com.roberto.gerenciadorfinanceiro.repository;

import com.roberto.gerenciadorfinanceiro.model.CategoriaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<CategoriaModel,Long> {
}
