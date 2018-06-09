function setup()
end

count = 0
M_TITLE = 0
M_GAME = 1
M_OVER = 2
mode = M_TITLE
counter = 0
chrs = {}
max_chrs = 4
x = 64 - 8
y = 64 - 8
score = 0

function loop()
  if mode == M_TITLE then
    mode = do_title()
  elseif mode == M_GAME then
    mode = do_game()
  elseif mode == M_OVER then
    mode = do_over()
  end
  counter = counter + 1
end

function do_title()
  color(0,0,0)
  fillrect(0,0, 128, 128)
  color(255, 255, 255)
  text("SAMLE GAME", 0, 0)

  color(0, 130, 0)
  text("AVOID ENEMIES", 25-1, 50-1)
  color(255, 255, 255)
  text("AVOID ENEMIES", 25, 50)

  if math.floor(counter/30)%2 == 0 then
    color(0,0,0)
  else
    color(255,255,255)
  end
  text("PRESS START", 30, 80)

  if btn(4) == 1 then
    return M_GAME
  end
  return M_TITLE
end

function new_chr()
  local chr,r
  if score < 50 then
    r = 1
  elseif score < 100 then
    r = 2
  elseif score < 150 then
    r = 3
  elseif score < 200 then
    r = 4
  else
    r = math.random(4)
  end

  if r == 1 then
    chr = {x = -16, y = math.random(128/16)*16, xv = 1, yv = 0}
  elseif r == 2 then
    chr = {x = 128, y = math.random(128/16)*16, xv = -1, yv = 0}
  elseif r == 3 then
    chr = {x = math.random(128/16)*16, y = -16, xv = 0, yv = 1}
  elseif r == 4 then
    chr = {x = math.random(128/16)*16, y = 128, xv = 0, yv = -1}
  end

  return chr
end

function do_game()
  color(0, 0, 0)
  fillrect(0, 0, 128, 128)
  color(255, 255, 255)
  text("score:" .. score, 0,0)

  if counter%10 == 0 then
    score = score + 1
  end

  if score < 200 then
    max_chrs = 4
  else
    max_chrs = (score - 200)/50 + 4
  end

  spr(x, y, 16, 16, 0, 0)
  if btn(0) > 0 and x > 0 then
    x = x - 1
  end
  if btn(1) > 0 and x < 128-16 then
    x = x + 1
  end
  if btn(2) > 0  and y > 0 then
    y = y - 1
  end
  if btn(3) > 0 and y < 128-16 then
    y = y + 1
  end

  local new_chrs = {}
  for key, c in pairs(chrs) do
    c.x = c.x + c.xv
    c.y = c.y + c.yv

    if math.abs((c.x + 8) - (x + 8)) < 12 and math.abs((c.y + 8) - (y + 8)) < 12 then
      return M_OVER
    end

    if -16 < c.x and -16 < c.y and c.x < 128 and c.y < 128 then
      new_chrs[#new_chrs + 1] = c
    end
    spr(c.x, c.y, 16, 16, 16, 0)
  end
  chrs = new_chrs

  local add_chr_num = max_chrs - #chrs
  for i = 1,add_chr_num do
    if math.random(50) == 1 then
      chrs[#chrs + 1] = new_chr()
    end
  end

  return M_GAME
end

function do_over()
  text("GAME OVER", 30, 60)

  if btn(4) == 1 then
    chrs = {}
    return M_TITLE
  end
  return M_OVER
end

