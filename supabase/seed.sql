-- Placeholder content ported from the design prototype. Re-runnable: every
-- insert upserts on its natural key so re-seeding never duplicates rows.

insert into ventures (slug, tag, title, blurb, theme_key, order_index) values
  ('energy-storage-stack', 'Energy', 'Al-Air → Li-ion → Supercap Stack',
   'AI-assisted staged energy storage system for vehicles, sequencing three storage chemistries by discharge profile.',
   'racetrack', 0),
  ('ai-soldering-machine', 'Hardware', 'AI Soldering Machine',
   'A learned-vision + parametric control system for automated precision soldering.',
   'workbench', 1),
  ('clear-cause', 'Social impact', 'Clear Cause',
   'A donation-matching dashboard connecting givers to verified causes with transparent impact tracking.',
   'clear', 2),
  ('nano-neo-panels', 'Hardware', 'Nano / Neo Panels',
   'Modular display panels that stream content in any form factor, reconfigurable on the fly.',
   'panels', 3),
  ('musiverse', 'Flagship', 'Musiverse',
   'An invertible encoding scheme mapping arbitrary data into musically valid compositions and back.',
   'musiverse', 4)
on conflict (slug) do update set
  tag = excluded.tag, title = excluded.title, blurb = excluded.blurb,
  theme_key = excluded.theme_key, order_index = excluded.order_index;

insert into posts (slug, title, excerpt, body, published, published_at) values
  ('on-clean-explanations', 'On clean explanations',
   'The friction of a "clean" explanation is what it silently omits — system boundaries, entropy, the open questions underneath.',
   'Placeholder body. Replace from the admin panel.', true, '2026-07-01'),
  ('first-principles-by-accident', 'First-principles by accident',
   'Arriving at Noether''s theorem before knowing its name — what that says about how intuition precedes formalism.',
   'Placeholder body. Replace from the admin panel.', true, '2026-06-01'),
  ('convergence-not-distinctiveness', 'Convergence, not distinctiveness',
   'What contemplative traditions share may matter more than what makes each one unique.',
   'Placeholder body. Replace from the admin panel.', true, '2026-05-01')
on conflict (slug) do update set
  title = excluded.title, excerpt = excluded.excerpt,
  published = excluded.published, published_at = excluded.published_at;

delete from resume_items;
insert into resume_items (period, role, org, detail, order_index) values
  ('2026 —', 'RF/Autonomy Intern', 'CACI Federal',
   'Counter-UAS RF systems and drone-building for detection testing.', 0),
  ('2023 —', 'B.S. Systems Engineering + Mathematics', 'University of Virginia',
   'Self-directed graduate-track math sequence (MIT OCW 18.06 → 18.03 → 18.100A).', 1);

delete from certifications;
insert into certifications (name, issuer, order_index) values
  ('18.06 — Linear Algebra', 'MIT OpenCourseWare', 0),
  ('18.03 — Differential Equations', 'MIT OpenCourseWare', 1),
  ('In progress: 18.100A — Real Analysis', 'MIT OpenCourseWare', 2);

delete from media_items;
insert into media_items (category, title, creator, blurb, order_index) values
  ('book', 'Gödel, Escher, Bach', 'Douglas Hofstadter', null, 0),
  ('music', 'Piano', null,
   'Classical piano, ~2 years in — working toward Rachmaninoff''s Piano Concerto No. 2.', 0);

delete from socials;
insert into socials (platform, url, icon_key, order_index) values
  ('Instagram', 'https://instagram.com/', 'instagram', 0),
  ('LinkedIn', 'https://linkedin.com/', 'linkedin', 1),
  ('GitHub', 'https://github.com/az5arpeera', 'github', 2);

insert into site_settings (key, value) values
  ('hero', '{"eyebrow":"Azhar Peera","headline":"A journey through frontiers, ideas, and the space between them.","sub":"Scroll down. Each current carries you somewhere different — engineering, music, philosophy, and the ventures forming between them."}'),
  ('about', '{"headline":"Systems Engineering & Mathematics, University of Virginia.","body1":"I build at the intersection of hardware, software, and first-principles thinking — from counter-UAS RF systems to a long-horizon device meant to help people understand each other more directly than language allows.","body2":"What I''m building toward: projects with real physical, mathematical, and musical density — the kind that don''t collapse into \"another app.\"","photoUrl":null}'),
  ('sections', '{"venturesHeadline":"The ocean gives way to the track.","notesHeadline":"Unfinished thoughts, in progress.","resumeHeadline":"Charted so far.","contactHeadline":"Partnerships, ideas, ventures — reach out."}'),
  ('resume', '{"pdfUrl":null}')
on conflict (key) do update set value = excluded.value;
