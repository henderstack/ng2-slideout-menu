"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require("../shared/index");
var NotificationPanelComponent = (function () {
    function NotificationPanelComponent(notificationService) {
        this.notificationService = notificationService;
        this.expanded = false;
        this.expandedState = 'collapsed';
    }
    NotificationPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notificationSub = this.notificationService.notifications$.subscribe(function (notifications) {
            _this.notifications = notifications.sort(function (a, b) { return b.date.valueOf() - a.date.valueOf(); }).slice(0, 10);
        });
    };
    NotificationPanelComponent.prototype.ngOnDestroy = function () {
        this.notificationSub.unsubscribe();
    };
    NotificationPanelComponent.prototype.toggleExpandedState = function () {
        this.expandedState = this.expanded ? 'collapsed' : 'expanded';
        this.expanded = !this.expanded;
    };
    NotificationPanelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notification-panel',
            templateUrl: 'notification-panel.component.html',
            styleUrls: ['notification-panel.component.css'],
            animations: [
                // Define the animation used on the containing dev where the width of the
                //  panel is determined. Here we define the expanded width to be 300px, and
                //  the collapsed width to be 38px.
                //
                // When expanding the panel we transition over a 200ms interval.
                //
                // When collapsing the panel we again use 200ms for the transition, but
                //  we add a delay of 200ms to allow some other animations to complete before
                //  shrinking the panel down.
                //
                core_1.trigger('panelWidthTrigger', [
                    core_1.state('expanded', core_1.style({ width: '300px' })),
                    core_1.state('collapsed', core_1.style({ width: '38px' })),
                    core_1.transition('collapsed => expanded', core_1.animate('200ms ease-in')),
                    core_1.transition('expanded => collapsed', core_1.animate('200ms 200ms ease-out'))
                ]),
                // Define the animation used in the title bar where the colors swap from
                //  a red foreground with white background, to the opposite. In this case
                //  we use the same timings as the width animation above so these two
                //  transitions happen at the same time
                //
                core_1.trigger('titleColorTrigger', [
                    core_1.state('collapsed', core_1.style({ backgroundColor: '#FFFFFF', color: '#E74C3C' })),
                    core_1.state('expanded', core_1.style({ backgroundColor: '#E74C3C', color: '#FFFFFF' })),
                    core_1.transition('collapsed => expanded', core_1.animate('200ms ease-in')),
                    core_1.transition('expanded => collapsed', core_1.animate('200ms 200ms ease-out'))
                ]),
                // The title text trigger is a little different because it's an animation
                //  for an element being added to the DOM. Here we take advantage of the 'void'
                //  transition using a hard-coded state called 'in' (which is also hard coded in
                //  the template).
                //
                // What we do in this animation is say when the element is added to the DOM
                //  it should have an opacity of 0 (i.e., hidden), wait 300ms, and then animate
                //  it's opacity change to 1 over a 100 ms time span. This effectively delays the
                //  appearance of the text until after the panel has slid out to the full size.
                //
                // When the element is removed we take a different approach and animate the
                //  opacity change back to 0 over a short 50ms interval. This ensures it's gone before
                //  the panel starts to slide back in, creating a nice effect.
                //
                core_1.trigger('titleTextTrigger', [
                    core_1.state('in', core_1.style({ opacity: '1' })),
                    core_1.transition('void => *', [core_1.style({ opacity: '0' }),
                        core_1.animate('100ms 300ms')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('50ms', core_1.style({ opacity: '0' }))
                    ])
                ]),
                // Define the animation used in the arrow icon where it rotates to point left
                //  or right based on the state of the panel. In this case we use the same 
                //  timings as the width animation above so these two transitions happen at 
                //  the same time.
                //
                core_1.trigger('iconTrigger', [
                    core_1.state('collapsed', core_1.style({ transform: 'rotate(0deg)' })),
                    core_1.state('expanded', core_1.style({ transform: 'rotate(180deg)' })),
                    core_1.transition('collapsed => expanded', core_1.animate('200ms ease-in')),
                    core_1.transition('expanded => collapsed', core_1.animate('200ms ease-out'))
                ])
            ]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.NotificationService])
    ], NotificationPanelComponent);
    return NotificationPanelComponent;
}());
exports.NotificationPanelComponent = NotificationPanelComponent;
