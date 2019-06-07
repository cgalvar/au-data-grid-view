import { bindable } from "aurelia-framework";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";

export class DataGridHead {
    
    onMouseUpSubscription: Subscription;
    spanPositionX: number;
    
    onDragSubscription: Subscription;
    columnSelected: any;
    columnDestined: any;
    
    tableContainer: any;
    columns;
    
    constructor(protected events:EventAggregator) {
        
    }

    columnsChanged(){
        
    }

    hoverReorder(column) {

        this.columnDestined = column;

    }

    listenSelectable() {

        this.onDragSubscription = this.events.subscribe('selectable.dragcolumn', (record) => {

            // comienza el dragado
            this.columnSelected = record;

            this.tableContainer.onmousemove = e => {

                e.stopImmediatePropagation();
                e.preventDefault();
                e.stopPropagation();
                this.spanPositionX = (e.clientX - 280);

            }

        })

        this.onMouseUpSubscription = this.events.subscribe('selectable.dragcolumn.mouseup', e => {
            // termina el dragado
            this.events.publish('selectable.dragcolumn.clear');
            this.reorder();

        });

    }

    reorder() {
        if (this.columnSelected && (this.columnSelected != this.columnDestined)) {
            let indexSelected = this.columns.indexOf(this.columnSelected);
            this.columns.splice(indexSelected, 1);
            let destinedIndex = this.columns.indexOf(this.columnDestined);

            this.columns.splice(destinedIndex, 0, this.columnSelected);
        }


        this.columnSelected = null;

    }

    deleteColumn(column) {

        if (!this.columnSelected) {
            this.columns.splice(this.columns.indexOf(column), 1);
        }

    }

}