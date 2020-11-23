var pane = $('#game'),
    box = $('#player'),
    // cat = $("#testCat"),
    w = pane.width() - box.width(),
    score = 0,
    d = {},
    x = 10;

function newv(v,a,b) {
    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
    return n < 0 ? 0 : n > w ? w : n;
}

$(window).keydown(function(e) { d[e.which] = true; });
$(window).keyup(function(e) { d[e.which] = false; });

setInterval(function() {
    box.css({
        left: function(i,v) { return newv(v, 37, 39); },
        top: function(i,v) { return newv(v, 38, 40); }
    });
    $(".cat").each(function(i) {
        if (overlaps(this, box[0])) {
            score++;
            $(this).remove();
        }
        $("#score").html(`Cats: ${score}`)
    });
}, 20);

// a & b are HTMLElements
function overlaps(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();
    const isInHoriztonalBounds =
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds =
      rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
    return isOverlapping;
  }

setInterval(function() {
    spawnCat();
}, 2000)

function spawnCat() {
    var x = Math.random()*100;
    var y = Math.random()*100;
    pane.append(`<div class="cat" style="top: ${y}%; left: ${x}%;" >
        <img class="catPic" src="cat.png" alt="cat">
        </div>`);
}


    
