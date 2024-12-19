import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { UiModule } from '../../modules/ui/ui.module';
import { gantt } from 'dhtmlx-gantt';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {provideNativeDateAdapter} from '@angular/material/core';
import moment from 'moment';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [ UiModule ],
  templateUrl: './gantt-chart.component.html',
  styleUrl: './gantt-chart.component.scss',
  providers: [ provideNativeDateAdapter() ]
})
export class GanttChartComponent implements AfterViewInit {
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
  @ViewChild('newTask') newTask!: TemplateRef<any>;

  isLockTasks: boolean = false;

  taskForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    text: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ]),
    start_date: new FormControl(moment().format('YYYY-MM-DD')),
    duration: new FormControl(1),
    readonly: new FormControl(true),
    color: new FormControl('')
  })

  weekScaleTemplate = (date: any) => {
		var dateToStr = gantt.date.date_to_str("%d %M");
		var endDate = gantt.date.add(date, 7 - date.getDay(), "day");
		return `${dateToStr(date)} - ${dateToStr(endDate)}`;
	};

  daysStyle = (date: any) => {
		if(date.getDay() === 0 || date.getDay() === 6){
			return "weekend";
		}
		return "";
	};


  constructor(private dialog: MatDialog, public utility: UtilityService) { }

  ngAfterViewInit(): void {
    // Set the start and end dates to limit the Gantt chart to a specific range
    const startDate = moment().startOf('month').toDate();  // January 1st, 2024
    const endDate = moment().toDate();  // January 30th, 2024

    // Set the visible date range for the Gantt chart
    gantt.config.start_date = startDate;
    gantt.config.end_date = endDate;

    gantt.config.drag_links = false;   // Disable task linking (dragging links)
    gantt.config.drag_progress = false; // Disable resizing of progress bar
    gantt.config.drag_move = true;
    gantt.config.resize_rows = true;
    
    // Disable double-click on tasks (rows)
    gantt.attachEvent("onTaskDblClick", (id, e) => {
      // Returning false prevents the default action (opening task editor, etc.)      
      const data = gantt.getTask(id);
      this.taskForm.patchValue(data);
      
      this.dialog.open(this.newTask);
      
      return false
    });

    // Configure timeline scales
	  gantt.config.min_column_width = 50;;
    gantt.config.scale_height = 90;
      
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y"},
      { unit: "week", step: 1, format: this.weekScaleTemplate },
      { unit: "day", step: 1, format: "%D", css: this.daysStyle }
    ];

    // Width of the grid on the left
    gantt.config.columns = [
      { name: "text", label: "Employees", width: "*", tree: false }, // Task name
      { name: "start_date", label: "Start Date", align: "center", width: 100 }, // Start date
    ];
    // gantt.setSkin("skyblue");

    // gantt.plugins({
    //   tooltip: true
    // });
    // gantt.attachEvent("onGanttReady", function(){
    //   var tooltips = gantt.ext.tooltips;
    //   tooltips.tooltip.setViewport(gantt.$task_data);
    // });

    gantt.init(this.ganttContainer.nativeElement);
    gantt.parse({
      data: [
        // { id: 1, text: 'Task 1', description: "This is the first task.", start_date: moment("2024-12-01").toDate(), duration: 1, color: "#FF6347", readonly: false },
        // { id: 2, text: 'Task 2', description: "This is the second task.", start_date: moment("2024-12-02").toDate(), duration: 3, color: "#4682B4", readonly: false }
      ],
    });  
  }

  onClickAddNew(element: any) {
    this.taskForm.reset();
    const dialog = this.dialog.open(element);
  }

  onClickSaveTask() {
    const { id, ...result }: any = this.taskForm.value;
    // const startDate = moment(start_date).format("YYYY-MM-DD")      
    const newTask = { id: gantt.getTaskCount() + 1, ...result }
    
    if (id > 0) {
      const updatedTask = {
        id,
        text: result.text,
        description: result.description,
        start_date: result.start_date,
        end_date: moment(result.start_date).add(result.duration, 'days').toDate(),
        duration: result.duration,
        color: "#4682B4",
        readonly: result.readonly,
      }
      gantt.updateTask(id, updatedTask);
    } else {
      gantt.addTask(newTask)
    }

    gantt.render();  // Re-render the Gantt chart after adding the task

    this.taskForm.reset();
    this.dialog.closeAll();
  }

  onClickLockTasks() {
    this.isLockTasks = !this.isLockTasks;
    gantt.config.drag_move = !this.isLockTasks;
    gantt.config.drag_resize = !this.isLockTasks;
    gantt.render();  // Re-render the Gantt chart after adding the task
  }

  get startDate() {
    return this.taskForm.get('start_date')
  }

  get duration() {
    return this.taskForm.get('duration')
  }
}
