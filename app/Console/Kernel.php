<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->call(function () {
        //     $users = DB::table('users')->get();
        //     foreach ($users as $user) {
        //         $task = ["id_usuario" => $user->id, "user_name" => $user->name, "rol" => $user->rol, "descripcion" => "Revisar Tareas Pendientes 3", 
        //         "progreso" => "No iniciada", "prioridad" => "Alta", "fecha_inicio" => date('Y-m-d'), "fecha_compromiso" => date('Y-m-d')];
        //         $data = DB::table('tareas')->insert($task);
        //     }
        //     $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        //     $out->writeln('success');
        // })->hourlyAt(1);

        // $schedule->call(function () {
        //     $date = date('H:i:s');
        //     $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        //     $out->writeln('GMT-hour: '.$date);
        // })->everyMinute();

        $schedule->call(function () {
            $current_task = DB::table('tareas_recurrentes')->where('periodicidad', '!=', 'Semanal')->get();
            $monthDays = cal_days_in_month(CAL_GREGORIAN, date('n'), date('Y'));
            $actualDay = date('j');
            foreach ( $current_task as $task){
                if( $task->periodicidad == 'Mensual' ){
                    if($task->dia > $monthDays && $actualDay == $monthDays){
                        $taskToAdd = ["user_id" => $task->user_id, "user_name" => $task->user_name, "rol_usuario" => $task->rol_usuario, "description" => $task->description, 
                                "progress" => "No iniciada", "priority" => "Alta", "fecha_inicio" => date('Y-m-d'), "fecha_compromiso" => date('Y-m-d')];
                        $data = DB::table('task')->insert($taskToAdd);
                    }else if( $task->dia == $actualDay){
                        $taskToAdd = ["user_id" => $task->user_id, "user_name" => $task->user_name, "rol_usuario" => $task->rol_usuario, "description" => $task->description, 
                            "progress" => "No iniciada", "priority" => "Alta", "fecha_inicio" => date('Y-m-d'), "fecha_compromiso" => date('Y-m-d')];
                        $data = DB::table('task')->insert($taskToAdd);
                    }
                }else if($task->dia == date('n') && $actualDay == '1'){
                    $taskToAdd = ["user_id" => $task->user_id, "user_name" => $task->user_name, "rol_usuario" => $task->rol_usuario, "description" => $task->description, 
                        "progress" => "No iniciada", "priority" => "Alta", "fecha_inicio" => date('Y-m-d'), "fecha_compromiso" => date('Y-m-d')];
                    $data = DB::table('task')->insert($taskToAdd);
                }
            }
            $out = new \Symfony\Component\Console\Output\ConsoleOutput();
            $out->writeln('success');
        })->daily();

        $schedule->call(function () {
            $current_task = DB::table('tareas_recurrentes')->where('periodicidad', 'Semanal')->get();
            foreach($current_task as $task){
                $taskToAdd = ["user_id" => $task->user_id, "user_name" => $task->user_name, "rol_usuario" => $task->rol_usuario, "description" => $task->description, 
                    "progress" => "No iniciada", "priority" => "Alta", "fecha_inicio" => date('Y-m-d'), "fecha_compromiso" => date('Y-m-d')];
                $data = DB::table('task')->insert($taskToAdd);
            }
            $out = new \Symfony\Component\Console\Output\ConsoleOutput();
            $out->writeln('success');
        })->weeklyOn(1, '0:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
