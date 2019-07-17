import { bindable, autoinject, bindingMode } from "aurelia-framework";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { DataGridHead } from "./data-grid-head";
import { ColumnDefinition } from "./column-definition";
import { SelectableHelper } from "@cgalvar/au-selectable";

var instances = 0;

@autoinject()
export class DataGridView extends DataGridHead{

    dragcolumnEventName: string;
    rowSelectedEventName: string;
    private identifier;

    onSelectRowSubscription: Subscription;
    onMouseUpSubscription: Subscription;

    // settings
    @bindable enableFilter = false;
    @bindable arrowMove = false;
    @bindable enableCloseColumns = false;
    @bindable oneRowAtTime = false;

    @bindable settings: dataGridSettings;


    // Data
    @bindable columns:any[];
    @bindable rows:any[];

    @bindable onOrderBy;

    // cuando se da un click a la fila
    @bindable clickRow:Function;

    // cuando se selecciona manteniendo presionado click izquierdo o un click derecho
    @bindable rowSelected:Function;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    rowDiselect:boolean;
    
    // cuando se deselecciona manteniendo presionado click izquierdo o un click derecho
    @bindable rowDiselected:Function;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    orderByColumn;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    orderByType;
    orderColumnSelected: any;
    private groupName: string;

    constructor(events: EventAggregator, private selectableHelper:SelectableHelper){
        super(events);
        instances++;
        this.identifier = instances;
        this.groupName = `data-grid-view-${this.identifier}`;
        this.rowSelectedEventName = `rowselected${this.identifier}`;
        this.dragcolumnEventName = `dragcolumn${this.identifier}`;
    }

    settingsChanged(){
        this.arrowMove = this.settings.arrowMove;
        this.enableCloseColumns = this.settings.enableCloseColumns;
        this.enableFilter = this.settings.enableFilter;
    }

    _onOrderBy(column:ColumnDefinition, type){
        
        if(type == ''){
            this.orderByColumn == '';
            this.orderColumnSelected = null;
            this.orderByType = type;
        }

        else{
            this.orderColumnSelected = column;
            this.orderByColumn = column.propertyKey;
            this.orderByType = type;
        }

        if(this.onOrderBy)
            this.onOrderBy({column: this.orderByColumn, type: type});

    }

    attached(){
        this.listenSelectable();
    }

    private _clickRow(row){
        if (this.clickRow) {
            this.clickRow({row:row});
        }
    }

    private onDiselect(row){
        if (this.rowDiselected) {
            this.rowDiselected(row)
        }
    }

    private onSelect(row){
        if (this.rowSelected) {
            this.rowSelected(row)
        }
    }

    private moveScroll(element:HTMLDivElement, scrollTo){

        let scroll = element.scrollLeft;

        if(scrollTo == 'rigth'){
            scroll += 300;
        }

        else if (scrollTo == 'left') {
            scroll -= 300;
        }

        element.scrollTo(scroll, 0);
    }

    clearSelections(){
        this.selectableHelper.clearGroup(this.groupName);
    }

}

export interface dataGridSettings {
    enableFilter: boolean;
    arrowMove: boolean;
    enableCloseColumns: boolean;
    oneRowAtTime: boolean;
}