<div class="row">
    <div class="col-md-10">
        @if($formMode === 'edit')
        <div class="form-group {{ $errors->has('id') ? 'has-error' : ''}}">
            <label for="id" class="control-label">{{ 'ID' }}</label>
            <input class="form-control {{ $errors->has('id') ? 'is-invalid' : ''}}" name="id" type="number" id="id" value="{{ isset($config->id) ? $config->id : old('id')}}" readonly >
            {!! $errors->first('id', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        @endif
    </div>
    <div class="col-md-10">
        <div class="form-group {{ $errors->has('label') ? 'has-error' : ''}}">
            <label for="label" class="control-label">{{ 'Nome' }}</label>
            <input class="form-control {{ $errors->has('label') ? 'is-invalid' : ''}}" name="label" type="text" id="label" value="{{ isset($config->label) ? $config->label : request('label')}}" required >
            {!! $errors->first('label', '<div class="invalid-feedback">:message</div>') !!}
        </div>
    </div>
    <div class="col-md-2">
        <div class="form-group">
            <label for="ativo" class="control-label">{{ 'Ativo' }}</label>
            <div class="form-check" id="ativo">
                <input class="form-check-input" type="radio" name="ativo" id="ativoS" value="1" @if(isset($config) && $config->ativo == 1) || request('ativo') === '1')) checked @endif>
                <label class="form-check-label" for="ativoS">
                    Sim
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="ativo" id="ativoN" value="0" @if(isset($config) && $config->ativo == 0) || request('ativo') === '0')) checked @endif>
                <label class="form-check-label" for="ativoN">
                    Não
                </label>                           
            </div>                              
        </div>
    </div> 
    
</div>
@if($formMode === 'edit')
<div class="row">
    <div class="col-md-6">
        <div class="form-group {{ $errors->has('termo_pesquisa') ? 'has-error' : ''}}">
            <label for="termo_pesquisa" class="control-label">{{ 'Termo da pesquisa (Escavador)' }}</label>
            <textarea class="form-control {{ $errors->has('termo_pesquisa') ? 'is-invalid' : ''}}" rows="5" name="termo_pesquisa" type="textarea" id="termo_pesquisa"  >{{ isset($config->termo_pesquisa) ? $config->termo_pesquisa : old('termo_pesquisa')}}</textarea>
            {!! $errors->first('termo_pesquisa', '<div class="invalid-feedback">:message</div>') !!}
        </div>
    </div>

    <div class="col-md-6">
        <div class="form-group {{ $errors->has('prompt') ? 'has-error' : ''}}">
            <label for="prompt" class="control-label">{{ 'Prompt (ChatGPT)' }}</label>
            <textarea class="form-control {{ $errors->has('prompt') ? 'is-invalid' : ''}}" rows="5" name="prompt" type="textarea" id="prompt"  >{{ isset($config->prompt) ? $config->prompt : old('prompt')}}</textarea>
            {!! $errors->first('prompt', '<div class="invalid-feedback">:message</div>') !!}
        </div>
    </div>
</div>

<div class="row">

    <div class="col-md-10">

        <div class="form-group {{ $errors->has('estados') ? 'has-error' : ''}}">
            <label for="estados" class="control-label">Regiões</label>
            @foreach($estados as $estado)
            <div class="col-8">
                <input type="checkbox" class="configs"name="estados[{{$estado->id}}]" id="estado_{{$estado->id}}" value="{{$estado->nome }}" {{ isset($config->estados[$estado->id]) || request('estados.'.$estado->id) ? 'checked' : '' }}>
                <label for="estado_{{$estado->id}}">
                    {{$estado->nome }} ({{$estado->diarios->count()}})
                </label>
                <a class="btn btn-sm btn-secondary" data-toggle="collapse" href="#collapseEstado{{$estado->id}}" role="button" aria-expanded="false" aria-controls="collapseEstado{{$estado->id}}">
                    Diários
                </a>
                <div class="collapse" id="collapseEstado{{$estado->id}}">
                    <div class="card card-body">
                        @foreach($estado->diarios as $diario)
                        <div class="">
                            <input type="checkbox" class="configs" name="tribunais[{{$diario->id}}]" id="tribunal_{{$diario->id}}" value="{{$diario->nome }}" {{ isset($config->tribunais[$diario->id]) || request('tribunais.'.$diario->id) ? 'checked' : '' }}>
                            <label for="tribunal_{{$diario->id}}">
                                {{$diario->nome }} 
                            </label>                            
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>

            @endforeach
            <a id="limparCheckbox" href="#" class="btn btn-secondary btn-sm" value="Limpar">Nenhum</a>
            <a id="todosCheckbox" href="#" class="btn btn-secondary btn-sm" value="Limpar">Todos</a>
            <hr>

            {!! $errors->first('estados', '<div class="invalid-feedback">:message</div>') !!}
            {!! $errors->first('tribunais', '<div class="invalid-feedback">:message</div>') !!}
        </div>
    </div>
</div> 
@endif

<div class="box-footer no-padding">
    <div class="mailbox-controls">
        <div class="btn-group">
            <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Atualizar' : 'Inserir' }}">
        </div>
        <div class="float-right">
        </div>
        <!-- /.pull-right -->
    </div>
</div>


@section('js')
<script>
function edit_select(campo,modelo){
    modelo = modelo.substring(1);
    var id = '#sel_'+campo;
    if($(id).val() != '' && $(id).val() != undefined){
        var url = '/admin/'+modelo+'/'+$(id).val()+'/edit';
        console.log(campo+ ' - '+ modelo + " - " + url);
        window.location = url;
    }
}


document.getElementById("limparCheckbox").addEventListener("click", function(event){
    console.log(event);
    event.preventDefault();

    var textinputs = document.querySelectorAll('input[type=checkbox].configs'); 
    textinputs.forEach(el => {
        el.checked = false;
    })

});

document.getElementById("todosCheckbox").addEventListener("click", function(event){
    console.log(event);
    event.preventDefault();

    var textinputs = document.querySelectorAll('input[type=checkbox].configs'); 
    textinputs.forEach(el => {
        el.checked = true;
    })

});


</script>
@endsection