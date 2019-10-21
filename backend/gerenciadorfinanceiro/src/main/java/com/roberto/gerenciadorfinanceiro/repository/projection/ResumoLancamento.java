package com.roberto.gerenciadorfinanceiro.repository.projection;

import com.roberto.gerenciadorfinanceiro.model.TipoLancamento;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ResumoLancamento {
    private Long codigo;
    private String descricao;
    private LocalDate dataVencimento;
    private LocalDate dataPagamento;
    private BigDecimal valor;
    private TipoLancamento tipo;
    private String categoria;
    private String pessoa;


    public ResumoLancamento(Long codigo, String descricao, LocalDate dataVencimento, LocalDate dataPagamento,
                            BigDecimal valor, TipoLancamento tipo, String categoria, String pessoa) {
        super();
        this.codigo = codigo;
        this.descricao = descricao;
        this.dataVencimento = dataVencimento;
        this.dataPagamento = dataPagamento;
        this.valor = valor;
        this.tipo = tipo;
        this.categoria = categoria;
        this.pessoa = pessoa;
    }



    public final Long getCodigo() {
        return codigo;
    }
    public final void setCodigo(Long codigo) {
        this.codigo = codigo;
    }
    public final String getDescricao() {
        return descricao;
    }
    public final void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public final LocalDate getDataVencimento() {
        return dataVencimento;
    }
    public final void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }
    public final LocalDate getDataPagamento() {
        return dataPagamento;
    }
    public final void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }
    public final BigDecimal getValor() {
        return valor;
    }
    public final void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    public final TipoLancamento getTipo() {
        return tipo;
    }
    public final void setTipo(TipoLancamento tipo) {
        this.tipo = tipo;
    }
    public final String getCategoria() {
        return categoria;
    }
    public final void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public final String getPessoa() {
        return pessoa;
    }
    public final void setPessoa(String pessoa) {
        this.pessoa = pessoa;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ResumoLancamento other = (ResumoLancamento) obj;
        if (codigo == null) {
            if (other.codigo != null)
                return false;
        } else if (!codigo.equals(other.codigo))
            return false;
        return true;
    }
}
