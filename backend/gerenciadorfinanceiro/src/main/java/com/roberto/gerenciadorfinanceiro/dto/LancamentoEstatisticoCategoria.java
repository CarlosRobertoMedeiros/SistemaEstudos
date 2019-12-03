package com.roberto.gerenciadorfinanceiro.dto;

import com.roberto.gerenciadorfinanceiro.model.CategoriaModel;

import java.math.BigDecimal;

/**
 * Retorna o Lançamento de Gastos por Categoria
 * para uma futura elaboração de gráficos
 *
 * @since 1.8
 */
public class LancamentoEstatisticoCategoria {

    private CategoriaModel categoria;
    private BigDecimal total;

    public LancamentoEstatisticoCategoria(CategoriaModel categoria, BigDecimal total) {
        this.categoria = categoria;
        this.total = total;
    }

    public CategoriaModel getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaModel categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
