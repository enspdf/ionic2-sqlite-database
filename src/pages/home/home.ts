import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { TasksService } from '../../providers/tasks-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: any[] = [];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public tasksService: TasksService) {
    
  }

  ionViewDidLoad() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getAll()
      .then(tasks => {
        this.tasks = tasks;
      });
  }

  openAlertNewTask() {
    let alert = this.alertCtrl.create({
      title: 'Crear tarea',
      message: 'escribe el nombre de la tarea',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar una nueva tarea',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            data.completed = false;
            this.tasksService.create(data)
              .then(response => {
                this.tasks.unshift( data );
              })
              .catch( error => {
                console.log( error );
              })
          }
        }
      ]
    });
    alert.present();
  }

  updateTask(task, index) {
    task = Object.assign({}, task);
    task.completed = !task.completed;
    this.tasksService.update(task)
      .then(response => {
        this.tasks[index] = task;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteTask(task: any, index) {
    this.tasksService.delete(task)
      .then(response => {
        console.log(response);
        this.tasks.splice(index, 1);
      })
      .catch(error => {
        console.log(error);
      })
  }

}
