import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/eye-8450215_640.webp"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Illuminati</h4>
          <h6>Council of Leo</h6>
        </div>
        <div className="col-6 p-3">
          <p>
  Illuminati was “founded” (or maybe it just always existed — who knows?) in 1980s as a side project to secretly control everything. But not in an evil way. More like… optimizing the matrix while sipping black coffee.
</p>
<p>
  Rumored to be behind stock market booms, viral trends, and maybe even your Spotify recommendations, its core team occasionally advises secret committees — or just edits Wikipedia anonymously.
</p>
<p>
  Meditation? Basketball? Nah — the council reaches zen by watching the world spiral into chaos... exactly as planned.
</p>

          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
