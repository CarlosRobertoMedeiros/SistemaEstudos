package com.roberto.gerenciadorfinanceiro.repository;

import com.roberto.gerenciadorfinanceiro.model.CidadeModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CidadeRepository extends JpaRepository<CidadeModel,Long> {

    List<CidadeModel> findByEstadoCodigo(Long estadoCodigo);
}
