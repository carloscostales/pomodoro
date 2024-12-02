import { Component } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  standalone: false,

  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss'
})

export class PomodoroComponent {
  isTimerRunning: boolean = false;
  minutes: number = 25; // Start with 25 minutes
  selectedMinutes: number = 25; // Start with 25 minutes
  seconds: number = 0; // Start with 0 seconds
  notificationsActivated: boolean = false;
  isRotating = false;
  private timer: any; // Reference to the timer interval

  ngOnInit(): void {
    this.checkNotificationPermission();
  }

  startTimer() {
    if (this.timer) {
      clearInterval(this.timer); // Prevent multiple intervals
    }

    this.isTimerRunning = true;

    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.stopTimer();
        this.showNotification("Timer ended", "The timer has ended"); // Show notification when the timer ends
      }
    }, 1000); // Update every second
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.isTimerRunning = false;
    }
  }

  resetTimerClick() {
    this.rotateButton();
    this.resetTimer();
  }

  resetTimer() {
    clearInterval(this.timer);
    this.minutes = this.selectedMinutes;
    this.seconds = 0;
    this.isTimerRunning = false;
  }

  rotateButton(): void {
    // Trigger the rotation by toggling the boolean flag
    this.isRotating = true;

    // After the rotation ends, reset the flag (this will stop the rotation animation)
    setTimeout(() => {
      this.isRotating = false;
    }, 1000);  // Adjust the timeout duration to match the animation time
  }

  changeTimer(minutes: number) {
    this.selectedMinutes = minutes;
    this.resetTimer();
  }

  // Check if notifications are enabled and update the checkbox state
  private checkNotificationPermission(): void {
    if ('Notification' in window) {
      // If permission is granted, set notificationActivated to true
      if (Notification.permission === 'granted') {
        this.notificationsActivated = true;
      } else {
        this.notificationsActivated = false;
      }
    } else {
      console.log('Your browser does not support notifications');
    }
  }

  toggleNotification(event: any): void {
    if (event.target.checked) {
      // Request notification permission
      this.requestNotificationPermission();
    } else {
      console.log('Notifications are disabled');
    }
  }

  // Request permission for notifications
  private requestNotificationPermission(): void {
    if ('Notification' in window) {
      // Check if permission is already granted
      if (Notification.permission === 'granted') {
        this.showNotification('Notifications Enabled!', 'You will now receive notifications.');
      } else {
        // Request permission from the user
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.showNotification('Notifications Enabled!', 'You will now receive notifications.');
            this.notificationsActivated = true; // Update the checkbox if granted
          } else {
            console.log('Notification permission denied');
            this.notificationsActivated = false; // Ensure the checkbox is unchecked if denied
          }
        });
      }
    }
  }

  // Show the notification
  private showNotification(title: string, body: string) {
    // Create the notification
    const notification = new Notification(title, {
      body: body,
      icon: 'assets/icons/crazy-frog.ico'
    });

    // Handle notification click (Optional)
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action (e.g., opening a new tab)
      window.focus(); // Focus on the browser window if clicked
    };
  }


  // Function to toggle fullscreen mode
  toggleFullscreen(): void {
    if (this.isFullscreen()) {
      this.exitFullscreen();
    } else {
      this.requestFullscreen();
    }
  }

  // Function to check if the document is in fullscreen mode
  private isFullscreen(): boolean {
    return document.fullscreenElement !== null;
  }

  // Function to request fullscreen
  private requestFullscreen(): void {
    const element = document.documentElement; // Fullscreen the entire document (you can also fullscreen a specific element)
    if ((element as any).requestFullscreen) {
      (element as any).requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { // For Firefox
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) { // For Chrome, Safari and Opera
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { // For Internet Explorer
      (element as any).msRequestFullscreen();
    }
  }

  // Function to exit fullscreen
  private exitFullscreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // For Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // For Chrome, Safari and Opera
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // For Internet Explorer
      (document as any).msExitFullscreen();
    }
  }
}
