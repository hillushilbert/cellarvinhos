@extends('adminlte::page')

@section('title', 'Configurações')

@section('content')
    <div class="container-fluid">
        <div class="row">

            <div class="col-md-12">
                <div class="card">
                    <div class="card-header with-border">
                        <h3 class="card-title">Configurações</h3>
                    </div>
                    <div class="card-body">
                        <div class="mailbox-controls">                    
                                <div class="btn-group">
                                    <a href="{{ url('/admin/configs/create') }}" class="btn btn-success btn-sm" title="Add New categoria">
                                        <i class="fa fa-plus" aria-hidden="true"></i> Adicionar
                                    </a> 
                                    <!-- <button type="button" class="btn btn-sm btn-primary mr-2" data-toggle="modal" data-target="#modalFiltro">
                                        <i class="fas fa-filter"></i> Filtro
                                    </button>  -->
                                </div>                          
                                <div class="float-right">
                                    <div class="btn-group">

                                    
                                        <form method="GET" action="{{ url('/admin/configs') }}" accept-charset="UTF-8" class="form-inline my-2 my-lg-0 float-right" role="search">
                                            <div class="input-group">
                                                <input type="text" class="form-control" name="search" placeholder="Pesquisar..." value="{{ request('search') }}"
                                                    style="width:80%">
                                                <span class="input-group-append">
                                                    <button class="btn btn-secondary" type="submit">
                                                        <i class="fa fa-search"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                        
                                    </div>
                                </div>
                        </div>
                        <!--./end barra de ferramentas -->
                        <input type="hidden" value="/admin/configs/create" name="rota" id="rota"> 


                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif						
						
                        <div class="table-responsive">
                            <table class="table grid" id="gridDataTable">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Nome</th>
                                        <th>Leads</th>
                                        <th>Ativo</th>
										<th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($configs as $item)
                                    <tr style="{{ $item->ativo !== true ? 'color:#ccc':'' }}">
                                        <td>{{ $item->id }}</td>
                                        <td>
                                            {{ $item->label }}<br>
                                            <small>{{ $item->produto->principio ?? 'N.I.'}}</small>
                                        </td>
                                        <td>{{ $item->leads()->count() ?? 0}}</td>
                                        <td>{{ $item->ativo === true ? 'Sim':'Não' }}</td>
                                        <td class="text-right">
                                            <a href="{{ url('/admin/configs/' . $item->id. '/edit' ) }}" title="Ver categoria">
                                                <button class="btn btn-primary btn-sm">
                                                    <i class="fas fa-pencil-alt" aria-hidden="true"></i> Editar
                                                </button>
                                            </a>
                                            <form method="POST" action="{{ url('/admin/configs' . '/' . $item->id) }}" accept-charset="UTF-8" style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete Marca" onclick="return confirm(&quot;Deseja excluir?&quot;)">
                                                    <i class="fas fa-trash-alt" aria-hidden="true"></i> Excluir
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                            <div class="pagination-wrapper"> {!! $configs->appends(Request::all())->render() !!} </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

<div class="modal fade" id="modalFiltro" tabindex="-1" role="dialog" aria-labelledby="modalFiltroTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <form id="formFiltro">
                <div class="modal-header">
                    <h3 class="titulo-modal"><span id="editarEntrega">Filtrar por
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </h3>
                                       
                </div>
                <div class="modal-body">
                    %%filterFieldsHtml%%
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="limparFormFiltro()">Limpar filtros</button>
                    <button type="submit" class="btn btn-primary">Filtrar</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection

@section('adminlte_js')
<script>
    var limparFormFiltro = function() {
        document.querySelectorAll('#modalFiltro input, #modalFiltro select').forEach(function(input) {
            input.value = ''
        });
    }
</script>
@stop
