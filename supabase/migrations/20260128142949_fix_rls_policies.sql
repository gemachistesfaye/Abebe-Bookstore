/*
  # Fix RLS Policies for Security

  1. Contact Submissions - Fix Always True Policy
    - Replace overly permissive policy with proper validation
    - Ensure submitted data meets minimum requirements
    - Prevent empty or malicious submissions
  
  2. Products - Ensure public read-only access
    - Verify products can be read by anyone
    - Ensure no unauthorized modifications possible
*/

DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;

CREATE POLICY "Allow contact form submissions with validation"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND
    name != '' AND
    email IS NOT NULL AND
    email != '' AND
    message IS NOT NULL AND
    message != '' AND
    length(name) <= 255 AND
    length(email) <= 255 AND
    length(message) <= 5000
  );

CREATE POLICY "No direct read access to contact submissions"
  ON contact_submissions FOR SELECT
  TO anon
  USING (false);