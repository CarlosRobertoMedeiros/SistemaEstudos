package com.roberto.gerenciadorfinanceiro.dto;

import com.roberto.gerenciadorfinanceiro.model.TipoLancamento;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Retorna o Lançamento de Gastos por Categoria
 * para uma futura elaboração de gráficos
 * Sendo o lançamento informado por dia agrupando receitas e despesas
 *
 * @since 1.8
 */
public class LancamentoEstatisticoPorDia {

    private TipoLancamento tipo;
    private LocalDate dia;
    private BigDecimal total;

    public LancamentoEstatisticoPorDia(TipoLancamento tipo, LocalDate dia, BigDecimal total) {
        this.tipo = tipo;
        this.dia = dia;
        this.total = total;
    }

    public TipoLancamento getTipo() {
        return tipo;
    }

    public void setTipo(TipoLancamento tipo) {
        this.tipo = tipo;
    }

    public LocalDate getDia() {
        return dia;
    }

    public void setDia(LocalDate dia) {
        this.dia = dia;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
