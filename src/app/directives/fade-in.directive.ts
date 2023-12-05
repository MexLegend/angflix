import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
  OnDestroy,
} from '@angular/core';

/**
 * Directive to implement a fade-in animation effect for elements within an `*ngFor` list when they are added or when the component initializes.
 *
 * Usage:
 * Apply this directive to the container element that contains elements rendered using `*ngFor`.
 *
 * Inputs:
 * - `delay`: Specifies the delay (in milliseconds) between the fade-in animation of each element. Default value is `100`.
 *
 * Methods:
 * - `ngAfterViewInit()`: Observes changes in the element's child list and initializes the fade-in animation on the existing elements.
 * - `observeChanges()`: Utilizes `MutationObserver` to detect additions to the child list and applies the fade-in animation to newly added elements.
 * - `applyAnimationToChildren()`: Initiates the fade-in animation on existing child elements.
 * - `applyAnimation(element: HTMLElement, index: number)`: Applies the transition effects to each element using opacity animation.
 *
 * Lifecycle Hooks:
 * - `ngOnDestroy()`: Disconnects the `MutationObserver` when the directive is destroyed to prevent memory leaks.
 *
 * Example:
 * <div appFadeIn [delay]="300">
 *   <div *ngFor="let item of items">
 *     {{ item }}
 *   </div>
 * </div>
 */
@Directive({
  selector: '[fadeIn]',
  standalone: true,
})
export class FadeInDirective implements AfterViewInit, OnDestroy {
  @Input() delay = 100;

  private observer!: MutationObserver;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.observeChanges();
    this.applyAnimationToChildren();
  }

  /**
   * Observes changes in the element's child list and applies the fade-in animation to newly added elements.
   */
  private observeChanges(): void {
    /**
     * Creates a new MutationObserver to monitor changes in the DOM.
     * When new child nodes are added to the observed element, it triggers a callback function.
     * If the mutation type is 'childList', it filters and applies the fade-in animation to the added nodes.
     */
    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => {
        if (mutation.type === 'childList') {
          // Filters added nodes that are HTMLElements (nodeType === 1) and applies the animation.
          Array.from(mutation.addedNodes)
            .filter((node) => node.nodeType === 1)
            .forEach((node, index) => this.applyAnimation(node, index));
        }
      });
    });

    // Starts observing changes in the native element's child list.
    this.observer.observe(this.elementRef.nativeElement, {
      childList: true,
    });
  }

  /**
   * Initiates the fade-in animation on existing child elements within the observed element.
   */
  private applyAnimationToChildren(): void {
    /**
     * Initiates the fade-in animation on each existing child element within the observed element.
     * Loops through all child elements and applies the fade-in animation to each element.
     */
    Array.from(this.elementRef.nativeElement.children).forEach(
      (element, index) => {
        this.applyAnimation(element, index);
      }
    );
  }

  /**
   * Applies the fade-in animation to the specified element using opacity transition effects.
   * @param element - The HTML element to which the fade-in animation will be applied.
   * @param index - The index used to determine the timing of the animation based on the delay value.
   */
  private applyAnimation(element: any, index: number): void {
    /**
     * Applies CSS classes and styles to the specified element to initiate a fade-in animation.
     * - Adds the 'transition-opacity' class to enable opacity transition effects.
     * - Sets the initial opacity to '0' to hide the element.
     * - Uses setTimeout to gradually change the opacity to '1' after a specified delay based on the index.
     *   The delay between each element's animation is calculated using `(index + 1) * this.delay`.
     */
    this.renderer.addClass(element, 'transition-opacity');
    this.renderer.setStyle(element, 'opacity', '0');

    setTimeout(() => {
      this.renderer.setStyle(element, 'opacity', '1');
    }, (index + 1) * this.delay);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
