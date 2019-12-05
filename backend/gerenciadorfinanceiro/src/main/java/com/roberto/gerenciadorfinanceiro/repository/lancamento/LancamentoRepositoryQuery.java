package com.roberto.gerenciadorfinanceiro.repository.lancamento;

import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoCategoria;
import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoPessoa;
import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoPorDia;
import com.roberto.gerenciadorfinanceiro.filter.LancamentoFilter;
import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.repository.projection.ResumoLancamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;


public interface LancamentoRepositoryQuery {

    public List<LancamentoEstatisticoPessoa> porPessoa(LocalDate inicio, LocalDate fim);
    public List<LancamentoEstatisticoCategoria> porCategoria(LocalDate mesReferencia);
    public List<LancamentoEstatisticoPorDia> porDia(LocalDate mesReferencia);

    public Page<LancamentoModel> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
}
