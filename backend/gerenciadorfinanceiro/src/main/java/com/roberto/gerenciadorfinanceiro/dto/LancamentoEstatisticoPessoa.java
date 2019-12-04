package com.roberto.gerenciadorfinanceiro.dto;

import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.model.TipoLancamento;

import java.math.BigDecimal;

public class LancamentoEstatisticoPessoa {
    private TipoLancamento tipo;
    private PessoaModel pessoa;
    private BigDecimal total;

    public LancamentoEstatisticoPessoa(TipoLancamento tipo, PessoaModel pessoa, BigDecimal total) {
        this.tipo = tipo;
        this.pessoa = pessoa;
        this.total = total;
    }

    public TipoLancamento getTipo() {
        return tipo;
    }

    public void setTipo(TipoLancamento tipo) {
        this.tipo = tipo;
    }

    public PessoaModel getPessoa() {
        return pessoa;
    }

    public void setPessoa(PessoaModel pessoa) {
        this.pessoa = pessoa;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
