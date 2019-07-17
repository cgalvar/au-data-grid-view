import { ColumnDefinition } from "resources";
import { DataGridView } from "elements/data-grid-view";

export class App {
  public message: string = 'from Aurelia!';

  public filterMessage = '';

  columns:ColumnDefinition[] = [
    {
      name: 'nombre',
      inputType: "text",
      propertyKey: 'nombre',
      "onFilter": (value)=>{
        this.filterMessage = `Estas buscado ${value} para el campo nombre`;
         // tu llamada a api o algoritmo de busqueda
      }
    },
    {
      name: 'apellido',
      inputType: "text",
      propertyKey: 'apellido'
    }
  ]

  rows = [
    {nombre: 'julio', apellido: 'gonzalez'},
    {nombre: 'julio', apellido: 'gonzalez'},
  ]
  dataGrid: DataGridView;

  attached(){
    this.setDataGrid();
  }

  setDataGrid(){
    this.dataGrid.enableFilter = true;
  }

  rowSelected(row){
    alert(`selected ${row.nombre}`)
  }

  rowDiselected(row){
    alert(`diselected ${row.nombre}`)
  }

}
