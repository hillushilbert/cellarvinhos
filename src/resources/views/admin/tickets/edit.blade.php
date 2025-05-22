@extends('adminlte::page')

@section('title', 'Configuração')

@section('content')
    <div class="container-fluid">
        <div class="row">
            
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header with-border">
                        <h3 class="card-title">Edição Configuração #{{ $config->id }}</h3>
                    </div>
                    <div class="card-body">
                        <a href="{{ url('/tickets') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Voltar</button></a>
                        <form method="POST" action="{{ url('/tickets' . '/' . $config->id . '/buscas') }}" accept-charset="UTF-8" style="display:inline">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}
                            <button type="submit" class="btn btn-info btn-sm" title="Delete Marca">
                                <i class="fas fa-trash-alt" aria-hidden="true"></i> Agenda Extração
                            </button>
                        </form>
                        <br />
                        <br />

                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif

                        <form method="POST" action="{{ url('/tickets/' . $config->id) }}" accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            @include ('admin.configs.form', ['formMode' => 'edit'])

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
