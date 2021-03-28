import React from 'react';

const Card = () => {
    return (
        <>
            <div class="col s12 m6 l4">
                <div class="card sticky-action">
                    <div style={{ height: "300px" }} class="card-image waves-effect waves-block waves-light responsive">
                        <img class="activator responsive-img" src={process.env.PUBLIC_URL + '/images/nlogo.jpg'} />
                        NNNNNN<br />
                    </div>
                    <div class="card-action">
                        <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                        <p><a href="#">This is a link</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;