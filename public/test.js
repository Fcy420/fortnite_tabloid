



function renderTweet(href) {
            const container = document.createElement('blockquote');
            container.className = 'twitter-tweet';
            const a = document.createElement('a');
            a.href = href;
            container.appendChild(a);
            return container;
        }

        async function generateTabloid() {
            const response = await fetch('/get');
            const tabloidData = await response.json();
            document.title = tabloidData.title;

            // Header
            document.querySelector('.header .logo').innerHTML = "FORTNITE TABLOID";
            document.querySelector('.header .date').innerText = tabloidData.date;

            const storyDiv = document.querySelector('.story');
            storyDiv.innerHTML = ''; // Clear static content

            tabloidData.sections.forEach((sec, index) => {
                if (index === 0) {
                    // Main story (no .section class)
                    const mainDiv = document.createElement('div');

                    const h2 = document.createElement('h2');
                    h2.className = 'headline';
                    h2.innerText = sec.headline;
                    mainDiv.appendChild(h2);

                    const pSub = document.createElement('p');
                    pSub.className = 'subhead';
                    pSub.innerText = sec.subhead;
                    mainDiv.appendChild(pSub);

                    if (sec.image) {
                        const img = document.createElement('img');
                        img.src = sec.image;
                        img.alt = sec.headline;
                        img.className = 'img-center';
                        mainDiv.appendChild(img);
                    }

                    if (sec.tweet) {
                        mainDiv.appendChild(renderTweet(sec.tweet));
                    }

                    if (sec.blunt) {
                        const pBlunt = document.createElement('p');
                        pBlunt.className = 'blunt';
                        pBlunt.innerText = sec.blunt;
                        mainDiv.appendChild(pBlunt);
                    }

                    storyDiv.appendChild(mainDiv);
                } else {
                    // Regular sections
                    const secDiv = document.createElement('div');
                    secDiv.className = 'section';

                    const h2 = document.createElement('h2');
                    h2.className = 'headline';
                    h2.innerText = sec.headline;
                    secDiv.appendChild(h2);

                    if (sec.subhead) {
                        const pSub = document.createElement('p');
                        pSub.className = 'subhead';
                        pSub.innerText = sec.subhead;
                        secDiv.appendChild(pSub);
                    }

                    if (sec.image) {
                        const img = document.createElement('img');
                        img.src = sec.image;
                        img.alt = sec.headline;
                        img.className = 'img-center';
                        secDiv.appendChild(img);
                    }

                    if (sec.text) {
                        const pText = document.createElement('p');
                        pText.innerHTML = sec.text;
                        secDiv.appendChild(pText);
                    }

                    if (sec.twitchEmbed) {
                        const videoDiv = document.createElement('div');
                        videoDiv.className = 'video-container';
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://www.twitch.tv/embed/${sec.twitchEmbed}/embed?parent=${location.hostname}&autoplay=false`;
                        iframe.frameBorder = '0';
                        iframe.allowFullscreen = true;
                        videoDiv.appendChild(iframe);
                        secDiv.appendChild(videoDiv);
                    }

                    storyDiv.appendChild(secDiv);
                }
            });

            // Re-init Twitter widgets after dynamic insert
            if (typeof twttr !== 'undefined') {
                twttr.widgets.load(storyDiv);
            }
        }

        window.onload = generateTabloid;