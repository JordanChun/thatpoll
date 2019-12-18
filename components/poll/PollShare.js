import ShareButton from './ShareButton';

const PollShare = props => (
  <div className='share-buttons'>
    <div id="fb-root"></div>
    <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=171678383930&autoLogAppEvents=1"></script>
    <div className="fb-share-button" data-href={props.url} data-layout="button" data-size="large">
    </div>
    <script dangerouslySetInnerHTML={{
      __html: `window.twttr = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                  t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function(f) {
                  t._e.push(f);
                };

                return t;
              }(document, "script", "twitter-wjs"));`}} />
    <a className="twitter-share-button" style={{ marginTop: '0.05rem' }}
      href="https://twitter.com/intent/tweet?"
      data-size="large">
      Tweet</a>
    <ShareButton url={props.url} />
  </div>
);

export default PollShare;