function trackAddToCart(event, eventsHistory) {
    window.dataLayer.push(...event);        
    console.log("-------> event track", event)
    return event
}

// Allow `trackAddToCart` to listen only on `ADD_TO_CART` event
trackAddToCart.eventType = '*';

export default trackAddToCart;